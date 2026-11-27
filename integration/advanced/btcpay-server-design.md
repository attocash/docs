---
title: BTCPay Server integration design
sidebar_label: BTCPay Server design
description: A proposed self-hosted ATTO checkout, the role of Greenfield invoices and payment requests, and a read-only check against a confirmed Atto Send.
---

# BTCPay Server integration design

BTCPay Server could offer ATTO at checkout through a payment-method plugin. Start with one store, one invoice denominated in ATTO, and one merchant-controlled receiving address reserved for that invoice. The merchant can test payment recognition before adding fiat pricing or wallet operations. This is a design for the [merchant roadmap](/docs/roadmap#phase-9-merchant-and-self-hosted-payments).

## Where the integration belongs

| Component | Role in an ATTO checkout |
| --- | --- |
| Store plugin | Register the ATTO network and payment-method handler, display the reserved address and quoted amount, and report confirmed payments to BTCPay. Upstream documents its Monero plugin as an example of the handler, checkout extension and transaction listener. [Altcoin integration guide](https://docs.btcpayserver.org/Development/Altcoins/) |
| Headless storefront | Create a store invoice with Greenfield, present its `checkoutLink`, and read the invoice again when notified of settlement. This uses a payment method already configured on the store. [Greenfield integration guide](https://docs.btcpayserver.org/Developers/api/) |
| Invoice | Hold the amount due, the payment window and the payments attributed to this checkout. Let BTCPay track partial, late and excess payments under its usual invoice rules. [Invoice lifecycle](https://docs.btcpayserver.org/Users/invoices/) |
| Payment request | Give a customer a longer-lived link. Selecting **Pay Invoice** creates an invoice for the outstanding or selected amount. Reserve the Atto address when that invoice is created, including on a subsequent attempt. [Payment requests](https://docs.btcpayserver.org/Users/payment-requests/) |

## Match a confirmed Send

For a first prototype, give the plugin a pool of public receiving addresses prepared by the merchant's wallet. Reserve an address and persist its network, algorithm, public key and quoted amount in raw units with the invoice. Keep the assignment after expiry so that a late transfer can still be attributed. This also distinguishes two customers who owe the same amount. One ATTO is 1,000,000,000 raw. [Atto units](https://atto.cash/)

An Atto node can return a confirmed account entry for a specific transaction hash. For a `SEND`, `publicKey` identifies the sender, `subjectPublicKey` identifies the recipient, and `previousBalance - balance` gives the amount in raw units. The merchant's later `OPEN` or `RECEIVE` makes those funds spendable. The payer's local wallet request ID stays off-chain. [Node API](/api/node) · [Atto payment verification](/docs/integration/agent-payments#connect-the-payment-to-an-api-result)

For a partial or excess payment, record the observed amount and let BTCPay apply its invoice rules. This read-only Python 3 example checks the historical transfer that funded the public Reward Bot. The live gateway returns the sender's previous balance as the JSON integer `17985000000000000000`. It exceeds both JavaScript's safe-integer limit and the maximum signed 64-bit integer. Read balances with an unsigned or arbitrary-precision integer parser and compare in raw units. [Public Send](https://atto.cash/explorer/transactions/0C88C05FEE9638D3ED196ABA1425A35C630CF2B7847B2AF924ABCB300D94F7AF)

```python
import json
from urllib.request import urlopen

node = "https://gatekeeper.live.application.atto.cash"
send_hash = "0C88C05FEE9638D3ED196ABA1425A35C630CF2B7847B2AF924ABCB300D94F7AF"
recipient_key = "72452B153C9D2FF225220340A5050A479C6C28F9C01BF5DB54F8E9EAA25F6870"
due_raw = 15_000_000_000_000_000

def raw(value):
    digits = str(value)
    if not (digits.isascii() and digits.isdecimal()):
        raise ValueError("Expected an unsigned integer in raw units")
    return int(digits)

def matches(entry, expected_hash, expected_key, amount):
    return (
        entry["hash"] == expected_hash
        and entry["blockType"] == "SEND"
        and entry["subjectAlgorithm"] == "V1"
        and entry["subjectPublicKey"] == expected_key
        and raw(entry["previousBalance"]) - raw(entry["balance"]) == amount
    )

with urlopen(f"{node}/accounts/entries/{send_hash}/stream", timeout=10) as stream:
    entry = json.loads(stream.readline())

print(matches(entry, send_hash, recipient_key, due_raw))  # True
```

## Test the checkout on a local network

Watch each reserved key through `/accounts/{publicKey}/receivables/stream` on the configured node. The `hash` in a receivable identifies the Send to look up. Persist its network, hash, invoice, observed raw amount and the UTC time the listener first verified the confirmed Send. Preserve that first observation on replay. It records when the merchant saw the payment and can be compared with invoice expiry during reconciliation. On restart, reconcile outstanding receivables and account entries since the saved height. For an `OPEN` or `RECEIVE` on the merchant account, read the transaction's `sendHash` to recover the original payment. Retry a timed-out lookup.

Register the payment with `AddPayment`, using a stable BTCPay payment ID derived from the network and Send hash. BTCPay keys each payment by `(Id, PaymentMethodId)` and saves it in a separate database transaction. A `null` return from `AddPayment` can also mean the invoice or payment prompt is missing. On replay, check that BTCPay has a payment with the expected ID, method, invoice and amount. If the payment is missing, keep the listener record pending and retry `AddPayment` after the cause clears. Flag a conflicting payment for investigation. Once the record matches, request an invoice refresh. On restart, repeat the refresh for any invoice still awaiting that update. [Payment service](https://github.com/btcpayserver/btcpayserver/blob/2868deedd9d911b715fec7306ea9cada36d86bff/BTCPayServer/Services/Invoices/PaymentService.cs#L37-L72) · [Payment key](https://github.com/btcpayserver/btcpayserver/blob/2868deedd9d911b715fec7306ea9cada36d86bff/BTCPayServer.Data/Data/PaymentData.cs#L33-L41) · [Invoice watcher](https://github.com/btcpayserver/btcpayserver/blob/2868deedd9d911b715fec7306ea9cada36d86bff/BTCPayServer/HostedServices/InvoiceWatcher.cs#L230-L256)

Create two equal-price invoices with different addresses and pay the first in full. Run the test twice, stopping the listener at each of these points in turn.

1. Stop after the listener records the Send and before BTCPay saves the payment.
2. Stop after BTCPay saves the payment and before the listener records success or requests the refresh.

After each restart, replay the notification. Expect one payment row for the Send, the first invoice settled before expiry, and the second invoice untouched. Have the merchant deduplicate fulfillment by order ID and check for exactly one delivery. Also verify that manually settling an invoice without its payment record leaves the order unfulfilled. Test a partial payment separately. Then compare a Send first observed before expiry and saved to BTCPay after a restart beyond expiry with a Send first observed after expiry. Both can produce `Expired/PaidLate`. Expect one stored payment and zero automatic deliveries for each, with the original observation times available for merchant review. Keep receiving and spending in the merchant's wallet throughout the test.
