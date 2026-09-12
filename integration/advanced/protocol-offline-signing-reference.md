---
title: Atto Transaction Format — Serialization and Offline Signing
sidebar_label: Protocol signing reference
description: Implement Atto transactions with field tables, byte layouts and examples for block hashing, offline signing, proof-of-work and address encoding.
---

# Atto transaction format and offline signing {#protocol-level-offline-signing-reference}

This reference describes the Atto protocol’s offline signing and transaction format. It is intended for
implementors (e.g., exchanges and custodial services) to build support without relying on the Kotlin reference code. We
cover how Atto’s double-entry blocks work, block serialization, block hashing, signing, Proof-of-Work, transaction
assembly, and address format. Exact field orders, byte lengths, and encodings are specified from the source.

## Overview of Atto Blocks

Atto is an account‑chain (double‑entry) ledger: every account maintains its own cryptographically‐linked chain of
blocks. A value transfer is represented twice—once as a debit on the sender’s chain (Send block) and once as a credit on
the receiver’s chain (Receive or Open block). This mirrors classic accounting’s double‑entry safety without a global
UTXO table: each account’s latest block already carries its up‑to‑date balance.

:::info
Receivables vs UTXO: A Send block instantly debits the sender. Until the receiver publishes its matching Receive (or
Open) block, the amount lives in a lightweight receivables list keyed by the send block hash. Receivables are only
pending credits; they are not spendable outputs and disappear once claimed.
:::

* **Open** – Initializes a new account chain with an “open” block.
* **Send** – Debits an account, sending coins to another address.
* **Receive** – Credits an account by receiving from a pending send.
* **Change** – Updates an account’s representative (voting weight delegate).

Every block contains:
`type | network | version | algorithm | publicKey | [height] | balance | timestamp | [previous] | … type-specific fields …`

* `type` (1 byte): The block type (0=Open, 1=Receive, 2=Send, 3=Change) as `AttoBlockType` code.
* `network` (1 byte): Network ID (LIVE=0, BETA=1, DEV=2, LOCAL=3).
* `version` (2 bytes, little-endian): Protocol version (currently 0).
* `algorithm` (1 byte): Cryptographic algorithm (currently only V1=0).
* `publicKey` (32 bytes): The account’s Ed25519 public key.
* `height` (8 bytes, ULong, little-endian): Account chain height **(present on Receive, Send, Change)**. For **Open**
  blocks, `height` is implicitly 1 (first block) and not stored.
* `balance` (8 bytes, ULong, little-endian): The new account balance after this block.
* `timestamp` (8 bytes, signed little-endian): UNIX time in milliseconds (must be >= initial network time).
* `previous` (32 bytes, hash): Hash of the previous block in this account chain **(Receive, Send, Change)**.
* **Send-specific fields**: `(receiverAlgorithm, receiverPublicKey, amount)`.
* **Receive-specific fields**: `(sendHashAlgorithm, sendHash)`.
* **Change-specific fields**: `(representativeAlgorithm, representativePublicKey)`.
* **Open-specific fields**: `(sendHashAlgorithm, sendHash, representativeAlgorithm, representativePublicKey)`.

Below we detail each block’s serialization.

## Block Type Serializations

Blocks are serialized by writing fields in the fixed order shown below (using little-endian encoding for multi-byte
numbers). The `writeAttoXxx` functions in the reference ensure consistency. All lengths are bytes.

### Open Block

Fields (in order):

```
[1B] type = 0 (OPEN)
[1B] network
[2B] version
[1B] algorithm
[32B] publicKey
[8B] balance (initial balance from SEND)
[8B] timestamp
[1B] sendHashAlgorithm (algorithm of send block’s hash, usually 0)
[32B] sendHash (hash of the send block being claimed)
[1B] representativeAlgorithm (algorithm of representative account, usually 0)
[32B] representativePublicKey (representative account public key)
```

* (Open blocks have no `previous` or `height`, since this is the first block.)
* **Total expected length: 119 bytes**.

**JSON example (Open block)**:

```json
{
  "type": "OPEN",
  "network": "LOCAL",
  "version": 0,
  "algorithm": "V1",
  "publicKey": "15625A4831C8F1312F1DB41550D0FD6C730FCC259ACE0FF88B500EA96783A348",
  "balance": 18000000000000000000,
  "timestamp": 1704616008836,
  "sendHashAlgorithm": "V1",
  "sendHash": "4DC7257C0F492B8C7AC2D8DE4A6DC4078B060BB42FDB6F8032A839AAA9048DB0",
  "representativeAlgorithm": "V1",
  "representativePublicKey": "69C010A8A74924D083D1FC8234861B4B357530F42341484B4EBDA6B99F047105",
  "height": 1
}
```

:::info
The height field displayed in the JSON example for an Open block (shown as 1) is for informational purposes only and
reflects the block's implicit position as the first in its account chain. This field is not part of the serialized Open
block data that is hashed or signed, as stated in the general block field descriptions. For all Open blocks, the
conceptual height is always 1.
:::

**HEX**:

```
000300000015625A4831C8F1312F1DB41550D0FD6C730FCC259ACE0FF88B500EA96783A348000008C5A1D8CCF9841C08E38C010000004DC7257C0F492B8C7AC2D8DE4A6DC4078B060BB42FDB6F8032A839AAA9048DB00069C010A8A74924D083D1FC8234861B4B357530F42341484B4EBDA6B99F047105
```

### Send Block

Fields (in order):

```
[1B] type = 2 (SEND)
[1B] network
[2B] version
[1B] algorithm
[32B] publicKey
[8B] height
[8B] balance (previous balance minus amount being sent)
[8B] timestamp
[32B] previous
[1B] receiverAlgorithm (algorithm of receiver account, usually 0)
[32B] receiverPublicKey (receiver account public key)
[8B] amount (amount being sent)
```

* **Total expected length: 134 bytes**.

**JSON example (Send block)**:

```json
{
  "type": "SEND",
  "network": "LOCAL",
  "version": 0,
  "algorithm": "V1",
  "publicKey": "A5E7E4B3B93150314E1177D5B9DE0057626B16A4B3C3F1DB37DF67628A5EF457",
  "height": 2,
  "balance": 1,
  "timestamp": 1704616009211,
  "previous": "6CC2D3A7513723B1BA59DE784BA546BAF6447464D0BA3D80004752D6F9F4BA23",
  "receiverAlgorithm": "V1",
  "receiverPublicKey": "552254E101B51B22080D084C12C94BF7DFC5BE0D973025D62C0BC1FF4D9B145F",
  "amount": 1
}
```

**HEX**:

```
0203000000A5E7E4B3B93150314E1177D5B9DE0057626B16A4B3C3F1DB37DF67628A5EF45702000000000000000100000000000000FB1D08E38C0100006CC2D3A7513723B1BA59DE784BA546BAF6447464D0BA3D80004752D6F9F4BA2300552254E101B51B22080D084C12C94BF7DFC5BE0D973025D62C0BC1FF4D9B145F0100000000000000
```

### Receive Block

Fields (in order):

```
[1B] type = 1 (RECEIVE)
[1B] network
[2B] version
[1B] algorithm
[32B] publicKey
[8B] height
[8B] balance (after receiving)
[8B] timestamp
[32B] previous
[1B] sendHashAlgorithm (algorithm of send block’s hash, usually 0)
[32B] sendHash (hash of the send block being claimed)
```

* **Total expected length: 126 bytes**.

**JSON example (Receive block)**:

```json
{
  "type": "RECEIVE",
  "network": "LOCAL",
  "version": 0,
  "algorithm": "V1",
  "publicKey": "39B56483A0DE38D9578CAF7EA791C2FEC96B318C7BD9989207B575334C5D9F1B",
  "height": 2,
  "balance": 18000000000000000000,
  "timestamp": 1704616009216,
  "previous": "03783A08F51486A66A602439D9164894F07F150B548911086DAE4E4F57A9C4DD",
  "sendHashAlgorithm": "V1",
  "sendHash": "EE5FDA9A1ACEC7A09231792C345CDF5CD29F1059E5C413535D9FCA66A1FB2F49"
}

```

**HEX**:

```
010300000039B56483A0DE38D9578CAF7EA791C2FEC96B318C7BD9989207B575334C5D9F1B0200000000000000000008C5A1D8CCF9001E08E38C01000003783A08F51486A66A602439D9164894F07F150B548911086DAE4E4F57A9C4DD00EE5FDA9A1ACEC7A09231792C345CDF5CD29F1059E5C413535D9FCA66A1FB2F49
```

### Change Block

Fields (in order):

```
[1B] type = 3 (CHANGE)
[1B] network
[2B] version
[1B] algorithm
[32B] publicKey
[8B] height
[8B] balance
[8B] timestamp
[32B] previous
[1B] representativeAlgorithm (algorithm of representative account, usually 0)
[32B] representativePublicKey (representative account public key)
```

* **Total expected length: 126 bytes**.

**JSON example (Change block)**:

```json
{
  "type": "CHANGE",
  "network": "LOCAL",
  "version": 0,
  "algorithm": "V1",
  "publicKey": "2415EE860847B3A1CE8B605267E83481D8426A4C42F8128EA72D72F0AD072DCC",
  "height": 2,
  "balance": 18000000000000000000,
  "timestamp": 1704616009221,
  "previous": "AD675BD718F3D96F9B89C58A8BF80741D5EDB6741D235B070D56E84098894DD5",
  "representativeAlgorithm": "V1",
  "representativePublicKey": "69C010A8A74924D083D1FC8234861B4B357530F42341484B4EBDA6B99F047105"
}

```

**HEX**:

```
03030000002415EE860847B3A1CE8B605267E83481D8426A4C42F8128EA72D72F0AD072DCC0200000000000000000008C5A1D8CCF9051E08E38C010000AD675BD718F3D96F9B89C58A8BF80741D5EDB6741D235B070D56E84098894DD50069C010A8A74924D083D1FC8234861B4B357530F42341484B4EBDA6B99F047105
```

Use the browser tools to [inspect block fields and validation](/docs/tools/blocks-transactions) alongside these formats.

## Block Hashing

An **Atto block hash** is computed by taking the BLAKE2b-256 hash (32 bytes) of the **serialized block bytes** (as
above). In code, this is `AttoHasher.hash(32, <blockBytes>)`. The resulting 32-byte hash is the `AttoHash` value stored
in subsequent blocks’ `previous` or `sendHash`.

## Signing

Every block is **signed with Ed25519** by the account’s private key. The signature covers the 32-byte block hash.
Signing yields a 64-byte signature. Specifically, `signature = Ed25519.Sign(blockHash)`. The `AttoSignature` type wraps
this 64-byte array. (Implementation note: match Ed25519’s usual bit order.)

Example:

```
Send: `0203000000A5E7E4B3B93150314E1177D5B9DE0057626B16A4B3C3F1DB37DF67628A5EF45702000000000000000100000000000000FB1D08E38C0100006CC2D3A7513723B1BA59DE784BA546BAF6447464D0BA3D80004752D6F9F4BA2300552254E101B51B22080D084C12C94BF7DFC5BE0D973025D62C0BC1FF4D9B145F0100000000000000`
Hash: `15601F3C70D7D27F104A7076DB399BE9123241A3ECCE6E833B676720B4E1F43E`
```

### Difficulty-Threshold Calculation

For every block you must know the **difficulty-threshold** that the 8-byte PoW nonce has to meet.
The threshold is *deterministic* and depends **only** on

1. the network (`LIVE`, `BETA`, `DEV`, `LOCAL`);
2. the **UTC calendar-year** of the block’s `timestamp`.

The Kotlin reference logic is reproduced below in prose so you can re-implement it in any language.

| Symbol                    | Meaning                                                                                                         | Typical value                                 |
|---------------------------|-----------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| `INITIAL_YEAR`            | The protocol launch year.                                                                                       | **2024**                                      |
| `INITIAL_LIVE_THRESHOLD`  | Baseline PoW target for the LIVE network at launch.                                                             | **2³³ − 1 = 8 589 934 591 (0x1\_FFFF\_FFFF)** |
| `DOUBLING_PERIOD`         | The interval in years over which the unrounded divisor doubles. The final divisor is truncated to a whole number. | **2.0**                                     |
| `thresholdIncreaseFactor` | A multiplier that makes test networks easier (larger threshold).<br/>LIVE = 1, BETA = 2, DEV = 8, LOCAL = 4 096 | network-specific                              |

These constants and the formula below follow the [Commons 7.0.1 work calculation](https://github.com/attocash/commons/blob/70e316c9719724f85fedf8709bf24e4806ed05f6/commons-core/src/commonMain/kotlin/cash/atto/commons/AttoWork.kt). Check that calculation when upgrading your integration.

#### Formula

```text
let year        = UTCYear(timestamp)               // e.g. 2025
let yearsPassed = year - INITIAL_YEAR              // e.g. 1
let decreasePow = yearsPassed / DOUBLING_PERIOD    // with doubles => 1 / 2 = 0.5
let decrease    = floor(2 ^ decreasePow)           // floor(2^0.5) = 1
let initialNet  = INITIAL_LIVE_THRESHOLD * thresholdIncreaseFactor(network)
threshold       = initialNet div decrease          // unsigned integer division
```

Truncate the positive exponential factor to an integer **before** dividing (`toULong()` in Kotlin). Then use unsigned integer division for the threshold. For 2025, the divisor is 1, not approximately 1.4142; flooring only the final result would produce a different threshold.

##### What it means in plain English

* **LIVE network** starts with `0x1_FFFF_FFFF` (≈8.6 billion).
* A smaller threshold makes valid work harder to find. The divisor is 1 in 2024 and 2025, 2 in 2026 and 2027, and 4 in 2028. A divisor of 2 halves the threshold, making work roughly twice as hard as at launch. Later years use the same formula and integer truncation.
* Test networks multiply the starting threshold first, making them *easier*, and then apply the same year-based divisor.

#### Work example

*Block on LIVE network with a timestamp of **2028-08-30 UTC**.*

```
yearsPassed   = 2028 - 2024 = 4
decreasePow   = 4 / 2.0     = 2.0
decrease      = floor(2 ^ 2.0) = 4
initialNet    = 8 589 934 591 * 1 = 8 589 934 591
threshold     = floor(8 589 934 591 / 4) = 2 147 483 647
```

So the 64-bit Blake2b hash of `nonce‖target` must be **≤ 0x7FFF\_FFFF** for the work to be valid.

#### Algorithm summary (pseudo-code)

```pseudo
function getThreshold(network, timestamp):
    if timestamp < INITIAL_DATE:  // reject pre-launch dates
        error "timestamp before network start"

    year          = utcYear(timestamp)           // 2024, 2025, …
    yearsPassed   = year - INITIAL_YEAR
    decreasePow   = yearsPassed / DOUBLING_PERIOD   // float math OK
    decrease      = floor(2 ^ decreasePow)
    baseThreshold = INITIAL_LIVE_THRESHOLD * thresholdIncreaseFactor(network)

    return baseThreshold div decrease  // unsigned integer division
```

Use the threshold you obtained here in the PoW check. The `target` for the PoW hash is defined as follows:

* For an **Open** block: The `target` is the 32-byte `publicKey` of the account being opened.
* For **Send**, **Receive**, or **Change** blocks: The `target` is the 32-byte `previous` block hash.

The PoW validation is then:

```
valid = ULong(Blake2b-64(nonce || target_value_as_defined_above)) ≤ threshold
```

## Transaction Assembly

A full **Atto transaction** consists of:

```
[Serialized Block bytes] || [64B signature] || [8B PoW nonce]
```

From code:

```kotlin
fun toBuffer(): Buffer {
  val serializedBlock = block.toBuffer()
  return Buffer().apply {
    write(serializedBlock)
    writeAttoSignature(signature)
    writeAttoWork(work)
  }
}
```

JSON example:

```json
{
  "block": {
    ...
  },
  // as above JSON block
  "signature": "<64B signature in hex>",
  "work": "<8B nonce in hex>"
}
```

## Publishing Transactions (REST)

Atto nodes expose two HTTP POST endpoints for publishing a signed transaction. Both accept `application/json` requests and wait for local confirmation before returning the confirmed transaction.

| Endpoint | Response after local confirmation |
| --- | --- |
| `POST /transactions` | Returns the confirmed transaction as a single JSON object. |
| `POST /transactions/stream` | Emits the confirmed transaction as one line of newline-delimited JSON (NDJSON), then closes the stream. |

Both endpoints use the same [confirmation operation](https://github.com/attocash/node/blob/v1.35/src/main/kotlin/cash/atto/node/transaction/TransactionController.kt), with a 40-second timeout on the confirmation wait. The [Node API reference](/api/node) includes transaction schemas.

After a timeout or lost response, inspect the original transaction hash and account history before creating another payment. A timeout is an unknown payment outcome, not proof that funds were not sent. See [payment failure recovery](/docs/whitepaper/technical#payment-failure-recovery).

### Request body

Both endpoints take exactly the JSON object described in [Transaction Assembly](#transaction-assembly) (block +
signature + work).

Example:

```json
{
  "block": {
    /* Send / Receive / … */
  },
  "signature": "f1c2…",
  "work": "ff00aa…"
}
```

### Success & Error Semantics

* **200 OK** – The returned transaction reports local confirmation. For streaming responses, inspect the emitted transaction rather than relying only on the initial HTTP status.
* **400 Bad Request** – Invalid transaction, such as a failed signature/work check, wrong network or malformed JSON. A transaction rejected during processing can also return this status; inspect the error before deciding how to recover.
* **Timeout or interrupted stream** – The confirmation result is unknown to the caller. Check the original transaction hash and account history before creating another payment.

### Querying Account State & Pending Credits

| Purpose                                                  | HTTP method & path                      | Notes                                                                                                                                                                                       |
|----------------------------------------------------------|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Latest account state**                                 | **GET `/accounts/{publicKey}`**         | Returns the account’s current balance, height, last-block hash, representative, etc. Use this whenever you **don’t know the latest state** before composing a new block.                    |
| **Stream pending receivables for one or more addresses** | **POST `/accounts/receivables/stream`** | Emits each *receivable* (unclaimed Send) as a separate line of JSON until the client closes the connection. Useful for wallets or services that want to sweep incoming funds automatically. |

**Receivable event shape (example):**

```json
{
  "hash": "0AF0F63BFE4DBC588F95FC3B154DE848AA9A5DD5604BAC99AE9E21C5EA8B4F64",
  "version": 0,
  "algorithm": "V1",
  "publicKey": "53F1A85D25EDA5021C01A77A2B1BA99CEF9DD5FD912D7465B8B652FDEDB6A4F8",
  "timestamp": 1705517157478,
  "receiverAlgorithm": "V1",
  "receiverPublicKey": "0C400961629D759176F009249A33899440900ABCE275F6C5C01C6F7F37A2C59A",
  "amount": 18000000000000000000
}
```

The server merges historical database rows with live “push” events, filters duplicates, and streams continuously. When
you receive one of these objects, create a matching **Receive** (or **Open**) block, sign it, add PoW, and publish via
`/transactions` or `/transactions/stream`.

That’s all you need to round out the integration story:

1. **Fetch state**
1. **Build a Block**
1. **Sign and Generate PoW**
1. **Publish**
1. **Continuously watch `/accounts/receivables/stream` for incoming transactions**.

## Address Format

Atto addresses encode the public key and algorithm. The format:

1. **Algorithm byte** (1 byte, e.g. `0` for V1).
2. **Public key** (32 bytes).
3. **Checksum** (5 bytes): The output of `Blake2b-40(algorthm || PublicKey)`.
4. **Concatenate** `[algorthm][publicKey][checksum]` = 1 + 32 + 5 = 38 bytes.
5. **Base32 encode** those 38 bytes (without padding, alphabet a-z2-7).
6. **Prefix** with `atto://`.

So address = `atto://` + Base32\_Encode(algorithm || publicKey || checksum).

Example:

```
algorithm=V1
publicKey=0202020202020202020202020202020202020202020202020202020202020202
address=atto://aabaeaqcaibaeaqcaibaeaqcaibaeaqcaibaeaqcaibaeaqcaibaevjhdj47s
```

## References and Constants

* Block type codes and sizes: `OPEN=0, RECEIVE=1, SEND=2, CHANGE=3` with sizes 119, 126, 134, 126 bytes respectively.
* Network codes: `LIVE=0, BETA=1, DEV=2, LOCAL=3`.
* Max version: current `version=0` (16-bit).
* Key sizes: 32-byte Ed25519 public key, 64-byte signature.
* Hash size: 32-byte Blake2b.
* Work nonce: 8 bytes, little-endian.

All numeric fields use **little-endian** when serialized (per `writeULongLe`, `writeUShortLe`). Fixed sizes must be
honored exactly.

**Implementers** should follow the above formats precisely. Test vectors (from the Kotlin tests) confirm these orders
and sizes. For example, `AttoBlockType` enum gives the expected sizes, and the `toBuffer` code shows write order. Always
compute block hash after serialization, then sign and attach PoW as specified.
