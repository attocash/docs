---
sidebar_position: 0
title: Documentation
description: Everything you need to know about Atto - the instant, feeless, and eco-friendly cryptocurrency
---

import Metric from "@site/src/components/Metric";

# Welcome to Atto Documentation

Atto is live, feeless digital cash built for payments. It confirms quickly, has no protocol transaction fees, and keeps consensus lightweight enough for everyday use.

## Quick Start

<div className="my-8 grid gap-4 md:grid-cols-3">
  <a href="/wallet" className="block rounded-xl border border-gray-200 bg-white p-5 text-neutral-700 transition-colors hover:border-brand-600 hover:shadow-card-md hover:no-underline">
    <h3 className="text-lg font-semibold text-neutral-900">Create a wallet</h3>
    <p className="mt-2 text-sm leading-relaxed text-neutral-600">Open the web wallet, create an account, and receive your first transactions.</p>
  </a>

  <a href="/faucet" className="block rounded-xl border border-gray-200 bg-white p-5 text-neutral-700 transition-colors hover:border-brand-600 hover:shadow-card-md hover:no-underline">
    <h3 className="text-lg font-semibold text-neutral-900">Get a small amount</h3>
    <p className="mt-2 text-sm leading-relaxed text-neutral-600">Use the faucet to try Atto without buying any first.</p>
  </a>

  <a href="/explorer" className="block rounded-xl border border-gray-200 bg-white p-5 text-neutral-700 transition-colors hover:border-brand-600 hover:shadow-card-md hover:no-underline">
    <h3 className="text-lg font-semibold text-neutral-900">Check the network</h3>
    <p className="mt-2 text-sm leading-relaxed text-neutral-600">View accounts, transactions, voters, and live network activity.</p>
  </a>
</div>

## Core Documentation

### [Whitepaper](/docs/whitepaper)
The technical overview of Atto's consensus, account-chain model, supply, and security assumptions.

- Open Representative Voting (ORV) consensus
- Account-chain architecture
- Anti-spam mechanism via lightweight PoW
- Fixed supply of 18B coins (no new minting)
- Energy-efficient consensus without mining

### [Token Distribution](/docs/distribution)
How Atto enters circulation through the faucet, Folding@Home mining, staking, and contribution rewards. Distribution rates can adjust through the [Growth Stability Index (GSI)](/docs/growth-stability-index).

- Faucet for new users
- Folding@Home mining for research contributors
- Staking rewards for accounts delegated to voters
- Contribution rewards for useful work

## Ways to Earn Atto

<div className="my-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <a href="/faucet" className="block rounded-xl border border-gray-200 bg-white p-5 text-neutral-700 transition-colors hover:border-brand-600 hover:shadow-card-md hover:no-underline">
    <h3 className="text-lg font-semibold text-neutral-900">Faucet</h3>
    <p className="mt-2 text-sm leading-relaxed text-neutral-600">Claim a small amount of Atto and test the network from your own wallet.</p>
  </a>

  <a href="/docs/mining" className="block rounded-xl border border-gray-200 bg-white p-5 text-neutral-700 transition-colors hover:border-brand-600 hover:shadow-card-md hover:no-underline">
    <h3 className="text-lg font-semibold text-neutral-900">Folding@Home mining</h3>
    <p className="mt-2 text-sm leading-relaxed text-neutral-600">Contribute compute to medical research and receive Atto from the mining program.</p>
  </a>

  <a href="/docs/staking" className="block rounded-xl border border-gray-200 bg-white p-5 text-neutral-700 transition-colors hover:border-brand-600 hover:shadow-card-md hover:no-underline">
    <h3 className="text-lg font-semibold text-neutral-900">Staking</h3>
    <p className="mt-2 text-sm leading-relaxed text-neutral-600">Delegate to a voter and receive daily rewards when your account stays eligible.</p>
  </a>

  <a href="/docs/reward-for-contributions" className="block rounded-xl border border-gray-200 bg-white p-5 text-neutral-700 transition-colors hover:border-brand-600 hover:shadow-card-md hover:no-underline">
    <h3 className="text-lg font-semibold text-neutral-900">Contributions</h3>
    <p className="mt-2 text-sm leading-relaxed text-neutral-600">Earn rewards for useful code, docs, security reports, guides, and community work.</p>
  </a>
</div>

## For Developers

### Integration Guides
- **[Node Setup](/docs/integration/node)** - Run your own Atto node
- **[Node API](/api/node)** - Complete REST API reference
- **[Wallet API](/api/wallet)** - Wallet service endpoints

### Advanced Topics
- **[Interactive Playground](/docs/integration/advanced/interactive-playground)** - Test seed generation and address conversion
- **[Offline Signing](/docs/integration/advanced/offline-signing-with-atto-commons)** - Sign transactions offline with atto-commons
- **[Protocol Reference](/docs/integration/advanced/protocol-offline-signing-reference)** - Offline signing protocol specification

## Key Features

### Instant Transactions
Atto does not wait for blocks. Transactions are processed as they reach the network; the current median/P50 confirmation time is about <a href="/metrics#confirmation-speed"><Metric name="network.confirmation-time.ms.seven-day-p50" precision={0} suffix=" ms" /></a>, and once representatives confirm a transaction, it is final.

### Zero Fees
Atto has no protocol transaction fee. If you send 1 ATTO, the recipient receives 1 ATTO. That makes small payments, tips, faucets, and everyday transfers practical instead of being eaten by fixed network fees.

### Eco-Friendly
Consensus is voting, not mining. Each transaction includes a small proof-of-work to slow spam, but representatives decide confirmation through **Open Representative Voting (ORV)**. The result is a payment network that stays lightweight without turning security into an energy race.

### Secure & Decentralized
Each account controls its own chain of transactions, and conflicting updates are rejected by representative votes. Delegation gives representatives voting weight, not custody of funds, so users can help secure the network without handing over their coins.

### Scalable
Atto uses account chains instead of one shared block queue. Independent accounts can move in parallel, so the network is not forced to serialize every payment through a single global block.

## Use Cases

- Micropayments for pay-per-use services, content tips, and in-app purchases
- Retail payments where checkout needs fast finality and no network fee
- Remittances where the sender should not lose value to fixed transfer fees
- Machine-to-machine payments for small automated transfers
- Gaming balances, item trades, donations, and tips

## How Atto Works

### Open Representative Voting (ORV)
Instead of mining blocks, Atto holders delegate voting weight to representatives they trust. Representatives vote on the validity of transactions and confirm the winning state.

### Account Chains
Each account has its own chain of transactions. That lets independent accounts move in parallel instead of waiting for a single global block queue.

### Anti-Spam Protection
To prevent spam without fees, Atto requires a small proof-of-work for each transaction. The work is lightweight for normal use but makes bulk spam more expensive.

### Fixed Supply
The full 18 billion ATTO supply was created at genesis. No new coins can be minted; distribution programs move that existing supply into circulation over time.

## Additional Resources

- **[Blog](/blog)** - Latest updates, guides, and announcements
- **[Explorer](/explorer)** - Real-time network activity
- **[Discord](https://discord.gg/atto)** - Join the community
- **[GitHub](https://github.com/attocash)** - Contribute to the codebase
- **[Buy Atto](https://www.xt.com/en/trade/atto_usdt)** - Available on LCX and XT exchanges

## Important Information

:::caution Legal Disclaimer
Atto coins may lose value, may not be liquid, and are not covered by investor compensation schemes. This documentation does not constitute financial advice or a prospectus. Always do your own research.
:::

## Get Involved

Atto needs practical contributions, especially work that helps people run, use, explain, or integrate the network.

- Improve the node, wallet, or libraries
- Write docs, tutorials, and integration notes
- Test releases and report bugs
- Help users on Discord
- Create useful guides or technical content

The [Contribution Rewards](/docs/reward-for-contributions) program explains what kinds of work may qualify for ATTO rewards.
