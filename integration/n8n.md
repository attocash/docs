---
title: Atto N8N Setup — Machine-to-Machine Payment Workflows
sidebar_label: N8N
description: Set up Atto nodes for machine-to-machine payment workflows in N8N. Read an account, listen for incoming payments, and receive funds with a dedicated wallet.
sidebar_position: 3
---

# Set up Atto in N8N {#atto-for-n8n}

Connect payments to a workflow: read an account, start a process when a payment arrives, or send funds as a workflow step. The package provides an **Atto** action node and an **Atto Trigger** node for live network events.

For capabilities and workflow examples, see [Atto payment workflows for N8N](/build/n8n).

## Install on self-hosted N8N

Use an N8N installation that permits community nodes. Its runtime must meet both N8N's requirements and this package's minimum of Node.js 22.22.0. See the [package](https://www.npmjs.com/package/@attocash/n8n-nodes-atto) and [installation reference](https://github.com/attocash/integrations-n8n#installation).

1. Open **Settings > Community Nodes** and select **Install**.
2. Enter `@attocash/n8n-nodes-atto`.
3. Review and accept the community-node warning, then install.

Restart N8N if the nodes do not appear in the picker.

## Read an account without a wallet secret

1. Create an **Atto API** credential. For the public LIVE service, use `https://gatekeeper.live.application.atto.cash` as **Node Base URL**. Leave **Wallet Secret** and **API Key** blank.
2. Add a **Manual Trigger**, then connect an **Atto** node and select that credential.
3. Select resource **Account**, operation **Get**, and enter a public Atto address in **Address**. Use your wallet's public address or one from the [explorer](/explorer).
4. Execute the node to read the account's balance, representative, height, and frontier. An account that is not open returns `found: false`.

This operation does not sign or publish anything. The credential test checks the Node endpoint only; it does not validate signing material or the Worker service.

## Start a workflow from an incoming payment

Add **Atto Trigger** and select event **Receivable**. Choose **Manual Addresses** for **Address Source**, then enter the public address in **Addresses**. This configuration can use the same credential with no wallet secret.

Run the trigger in test mode or activate the workflow to listen for live receivable events. The trigger uses the Node's streaming endpoints and reconnects when a stream closes. You can import the [receivable-trigger example](https://github.com/attocash/integrations-n8n/blob/main/examples/receivable-trigger.json); select your own credential and switch its **Address Source** to **Manual Addresses** to use it without a wallet secret.

A receivable is an incoming payment waiting to be received by its destination account. The trigger only reports it. To receive funds, connect an **Atto** node using **Receivable > Receive**, with signing credentials for that destination. This step publishes a receive transaction, or opens the account for its first payment. See the [incoming-to-receive example](https://github.com/attocash/integrations-n8n/blob/main/examples/incoming-to-receive.json).

## Enable signing only where it is needed

Sending, receiving, and changing representatives need:

- **Worker Base URL**, alongside the Node URL. The public LIVE default for both is `https://gatekeeper.live.application.atto.cash`.
- **Wallet Secret Type** and **Wallet Secret** in an Atto API credential: a 24-word Atto mnemonic or a compatible private key.
- The correct **Key Index** for mnemonic-derived accounts; it defaults to `0`.

To send, choose **Transaction > Send** and set **Destination Address**, **Amount**, and **Amount Unit**. Executing this operation signs and publishes a real payment.

:::warning Workflow credentials grant signing access
N8N does not use the CLI/MCP profile or inherit its spending caps and terminal approvals. A workflow with signing credentials can submit transactions when it runs. Use a dedicated wallet, restrict credential and workflow access, and design any approval and spending checks in the workflow itself.
:::

Keep wallet secrets in N8N's encrypted credentials, not chat, exported workflow JSON, or ordinary node parameters. Review execution-data retention before using real funds. The [security and operation reference](https://github.com/attocash/integrations-n8n/blob/main/USAGE.md) covers credential use and node behavior.

## Machine-to-machine payment workflow {#machine-to-machine-payment-workflow}

Use the maintained [incoming-to-receive workflow](https://github.com/attocash/integrations-n8n/blob/main/examples/incoming-to-receive.json) to turn an incoming payment into spendable funds. It connects **Atto Trigger > Receivable** to **Atto > Receivable > Receive**. The trigger watches the address derived from your credential; the action signs and publishes a Receive transaction, or an Open transaction for an unopened account.

1. Download the example JSON and import it into N8N.
2. Select your own dedicated **Atto API** signing credential in **both nodes**. The exported credential named `Atto Local`, with ID `1`, is a placeholder.
3. Check the credential's **Wallet Secret Type**, **Wallet Secret**, and **Key Index** against your intended receiving address. Use Node and Worker URLs for the same network. For LIVE, both public URLs are `https://gatekeeper.live.application.atto.cash`.
4. Keep the trigger's **Address Source** set to **Credentials** and the action's **Secret Source** set to **Credentials**. Review both nodes and their signing access before running the workflow.
5. When ready to test it yourself, start the trigger in test mode and send a small payment from another wallet on that network. Inspect the trigger item, then the receive action's output. Confirm the receiving account with **Account > Get**.

The trigger item includes the incoming Send's `hash`, recipient `address`, `fromAddress`, and `amount`. The receive action returns `status: "received"`, its own transaction `hash`, the receiving `address`, `amount`, and `height`. Keep the incoming and receive hashes distinct. **Account > Get** should report `found: true` and a balance that includes the received amount. An unopened account becomes open after its first successful receive.

The action processes each supplied receivable item. A run with several input items can publish several Receive/Open transactions; the action does not drain other pending funds automatically.

For a paid service, add your own quoting, payment verification, order matching, and result delivery as described in the [agent payment guide](/docs/integration/agent-payments#connect-the-payment-to-an-api-result). Only start the purchased work after checking the payment against the intended order. N8N signing credentials grant the workflow access to this wallet and do not inherit CLI/MCP spending limits.

## Next steps

- [How agents pay for APIs](/docs/integration/agent-payments) explains payment verification, order matching, and result delivery.
- [Compare agent payment networks](/blog/payments-for-ai-agents-compared) for costs, funding, and confirmation guarantees.
- [Build with Atto](/docs/integration) to compare integration options.
- [MCP](/docs/integration/mcp) for agent access, or [CLI](/docs/integration/cli) for terminal payments.
- [N8N source and examples](https://github.com/attocash/integrations-n8n) for the full operation list and importable workflows.
