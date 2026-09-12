---
sidebar_position: 0
title: Documentation
description: Build with Atto, explore its payment model, and find wallet, network, and integration guides for agents and humans.
---

import Metric from "@site/src/components/Metric";
import GuideCards from "@site/src/components/Docs/GuideCards";

# Atto documentation {#welcome-to-atto-documentation}

Atto is feeless digital cash for agents and humans. Start with an integration, try a wallet, or look inside the protocol.

## Quick Start

<GuideCards items={[
  {title: 'Build with Atto', label: 'Integrations', description: 'Connect an AI agent, use the CLI, automate with N8N, or build with Commons.', href: '/docs/integration'},
  {title: 'Explore the protocol', label: 'How it works', description: 'Understand account chains, representative voting, and the two sides of a payment.', href: '/docs/whitepaper/technical'},
  {title: 'Create a wallet', label: 'Get started', description: 'Choose a wallet and learn how to receive your first payment.', href: '/wallet'},
  {title: 'Inspect the data', label: 'Browser tools', description: 'Explore amounts, addresses, blocks, and network data without building an integration first.', href: '/docs/tools'},
]} />

Already have a wallet? [Try the faucet](/faucet) for a small amount, or [open the explorer](/explorer) to inspect accounts and transactions.

## Core Documentation

### [Whitepapers](/docs/whitepaper)
Read the MiCA Crypto-Asset Whitepaper or the separate technical explanation of Atto's consensus, account-chain model, supply, and security assumptions.

- Open Representative Voting (ORV) consensus
- Account-chain architecture
- Anti-spam mechanism via lightweight PoW
- Fixed supply of 18B coins (no new minting)
- Representative voting rather than competitive proof-of-work mining for consensus

### [Token Distribution](/docs/distribution)
How Atto enters circulation through the faucet, Folding@Home mining, staking rewards, and contribution rewards. Rates and eligibility follow the current reward policy. The [Growth Stability Index (GSI)](/docs/growth-stability-index) adjusts configured rates for distribution programmes that use it.

- Faucet for new users
- Folding@Home mining for research contributors
- Staking rewards for eligible accounts delegated to participating voters
- Contribution rewards for useful work

## Distribution and Reward Routes

:::note Reward availability
Reward eligibility, rates, and timing depend on the current rules for each route and may change.
:::

<GuideCards items={[
  {title: 'Faucet', description: 'Claim a small amount of Atto and try payments from your own wallet.', href: '/faucet'},
  {title: 'Folding@Home mining', description: 'Contribute compute to medical research. Rewards depend on the current mining rules.', href: '/docs/mining'},
  {title: 'Staking', description: 'Read the eligibility rules for accounts delegated to participating voters.', href: '/docs/staking'},
  {title: 'Contributions', description: 'Find the reward policy for useful code, docs, security reports, and community work.', href: '/contributions'},
]} />

## For Developers

### Integration Guides
- **[Build with Atto](/docs/integration)** - Choose MCP, CLI, N8N, or Commons and follow a first-party guide
- **[Node Setup](/docs/integration/node)** - Run your own Atto node
- **[Node API](/api/node)** - Complete REST API reference
- **[Wallet API](/api/wallet)** - Wallet service endpoints

### Advanced Topics
- **[Atto Tools](/docs/tools)** - Inspect encodings, hashes, addresses, keys, blocks, transactions, and live network data
- **[Offline Signing](/docs/integration/advanced/offline-signing-with-atto-commons)** - Sign transactions offline with atto-commons
- **[Protocol Reference](/docs/integration/advanced/protocol-offline-signing-reference)** - Offline signing protocol specification

## Key Features

### Instant Transactions
Atto does not wait for a shared block queue. Transactions are processed as they reach the network, and the current median/P50 confirmation time is about <a href="/metrics#confirmation-speed"><Metric name="network.confirmation-time.ms.seven-day-p50" precision={0} suffix=" ms" /></a>. A transaction may be treated as confirmed when it satisfies the network's then-current voting rules. Confirmation and recovery still depend on software, voting-weight distribution, connectivity, infrastructure, and operating conditions.

### Zero Fees
Atto has no protocol transaction fee. If you send 1 ATTO, the recipient receives 1 ATTO. That makes small payments, tips, faucets, and everyday transfers practical instead of being eaten by fixed network fees.

### Lightweight Consensus
Consensus is voting, not mining. Each transaction includes a small proof-of-work to slow spam, but representatives decide confirmation through **Open Representative Voting (ORV)**. The result is a payment network that stays lightweight without turning security into an energy race.

### Secure & Decentralized
Each account controls its own chain of transactions, and conflicting updates are resolved by representative votes. Delegation assigns representatives voting weight without transferring custody of the account's funds.

### Scalable
Atto uses account chains instead of one shared block queue. Independent accounts can move in parallel, so the network is not forced to serialize every payment through a single global block.

## Use Cases

- Micropayments for pay-per-use services, content tips, and in-app purchases
- Retail payments where checkout needs fast confirmation and no network fee
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
<!-- Revalidation owner: Atto documentation maintainers; recheck both venue links and statuses before each documentation release. -->
- **[XT ATTO/USDT](https://www.xt.com/en/trade/atto_usdt)** - Third-party market; availability and status are controlled by XT and may change
- **[LCX ATTO/EUR](https://lcx.com/en/trade/ATTO-EUR)** - Third-party market; availability and status are controlled by LCX and may change

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

The [Contribution Rewards policy](/docs/reward-for-contributions) explains what kinds of work may qualify for ATTO rewards.
