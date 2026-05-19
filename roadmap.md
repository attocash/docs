---
sidebar_position: 6
---

# Roadmap

*What shipped, what changed, and what comes next.*

Atto did not move in a straight line. Some ideas shipped. Some got replaced once a simpler path became obvious. This
roadmap is the public trail: completed phases read as history, open phases read as work still ahead.

## Phase 0: Pre-release

Status: complete

<details>
<summary>What shipped</summary>

### Public website

The first website gave Atto a home: the whitepaper, basic docs, community links, and a place for new users to
understand what the project was trying to build.

### Live network

The network went live early, before every product surface was polished. That mattered. Real accounts and real
transactions gave us better feedback than a private test environment could.

</details>

## Phase 1: Explorer and platform stabilization

Status: complete

<details>
<summary>What shipped</summary>

### Explorer

The [explorer](/explorer) made the network visible. Users could inspect accounts and transactions without asking an
operator to check node logs.

### Faucet and wallet improvements

The faucet and wallet were tightened up around the basic loop: get a small amount of ATTO, open a wallet, send it,
receive it, and see the transaction on the explorer.

</details>

## Phase 2: Wallet direction

Status: complete

<details>
<summary>What changed</summary>

Native Android and iOS wallets were the first plan. We changed direction.

Atto needed one wallet that could move faster across desktop and mobile, so the web wallet became the main wallet
surface. That kept development focused on the flows that mattered most: creating an account, receiving funds, sending
ATTO, and later, choosing a voter for staking.

</details>

## Phase 3: Mining through Folding@Home

Status: complete

<details>
<summary>What shipped</summary>

Atto does not use mining for consensus. Consensus uses Open Representative Voting.

The "mining" program is a distribution path. Users contribute computing power to
[Folding@Home](https://foldingathome.org), and Atto rewards completed work through the mining program. Electricity goes
toward scientific computation instead of repeated hashing for block production.

</details>

## Phase 4: Public launch

Status: complete

<details>
<summary>What shipped</summary>

After the pre-release period, Atto moved into a broader public launch. By then, the network, website, wallet, faucet,
explorer, and early distribution paths were usable enough for people outside the initial group of testers.

</details>

## Phase 5: Integrations

Status: complete

<details>
<summary>What shipped</summary>

### Developer APIs and services

The integration work made Atto easier to build on. The docs now cover the node, wallet server, work server, signer, and
the API references needed to send, receive, inspect accounts, and operate infrastructure.

### Listings and discovery

Atto reached public discovery and listing channels, including exchange listing announcements and CoinGecko coverage.
Current market availability can change, so the roadmap should not be used as the source of truth for where ATTO trades
today.

### Node metrics

Node operators got health and Prometheus metrics so they can monitor infrastructure instead of guessing from the
outside.

</details>

## Phase 6: Representative program

Status: complete

<details>
<summary>What shipped</summary>

### Staking and voter choice

The representative program moved voting from a background network detail into something users can act on. Wallet users
can choose a voter, keep custody of their ATTO, and receive rewards when they are eligible.

### Voter transparency

The staking docs, wallet, [voter explorer](/explorer/voters), and [metrics dashboard](/metrics) make voter choice less
opaque. Users can compare voters, avoid crowded ones, and understand how delegation affects the network.

### Daily rewards

Rewards are paid daily for eligible accounts. The current APY and distribution data are dynamic, so the live staking
docs and wallet should be used for current values.

</details>

## Side quests: redesigns

Status: complete

<details>
<summary>What shipped</summary>

These were not protocol milestones, but they mattered. If Atto is supposed to feel like everyday money, the public
product surfaces have to be clear.

### Website redesign

The website had grown around launches, docs, metrics, blog posts, and integration pages. The redesign made the current
product easier to understand: wallet, staking, mining, explorer, metrics, integrations, and community entry points.

The goal was less marketing wallpaper and more direct paths. People should be able to land on the site and know what
Atto is, how to try it, how to earn it, how to build with it, and where to check the network.

### Wallet redesign

The wallet is where Atto either feels usable or it does not.

The redesign focused on the everyday flows: onboarding, account overview, sending, receiving pending funds, staking,
voter selection, local work status, and mobile use. The hard parts should be visible when they matter and out of the way
when they do not.

</details>

## Phase 7: Micropayment rails

Status: started

Atto already has the traits small payments need: fast confirmation, no protocol fees, and simple transfers. The next
step is turning that into payment flows that software can use without a custom checkout for every request.

This phase is about making small paid requests work for APIs, tools, and agents.

Planned work:

- Support an x402-style payment flow where a service can request payment, the client can pay, and the service can return
  the resource after verification.
- Keep the design multi-rail so ATTO can be used where it makes sense without closing the door on other payment rails.
- Ship one paid demo endpoint with settlement receipts, replay protection, and clear failure behavior.
- Add spending controls for agents: per-call limits, daily limits, allowlists, duplicate-payment checks, and readable
  payment metadata.
- Publish developer docs for protecting an API route or MCP tool behind a small payment.

## Phase 8: `atto.market` beta

Status: planned

`atto.market` should be the first public product built on the new rails. The goal is not a giant app store. The first
version should be a small, curated market for agent-ready paid services.

Planned work:

- Launch a beta catalog for paid APIs, MCP tools, and agent services.
- Start with a few useful first-party or closely reviewed listings, such as Atto network data, explorer queries, market
  context, or small automation tools.
- Make each listing readable by humans and agents: description, price, accepted rails, input schema, output schema,
  uptime/status, and integration docs.
- Provide an agent-readable discovery path so an agent can find a service, inspect the price and schema, pay, and call
  the endpoint.
- Include one complete example showing an agent discovering a listing, paying for it, and using the result.

## Phase 9: Merchant and self-hosted payments

Status: planned

Once the core payment flow is proven, Atto should support merchant infrastructure that people already run.

Planned work:

- Research BTCPay Server integration paths: plugin, headless API integration, payment requests, and invoices.
- Build the smallest useful BTCPay integration before attempting a full payment-server stack.
- Keep self-hosting as the default direction for merchants who do not want a hosted processor.

## Phase 10: Content payments

Status: planned

The original content idea still matters: pay to read an article, unlock a post, tip a creator, or add a small payment
plugin to a website. This comes after merchant and self-hosted payments because the payment rails should be proven
before the creator-facing plugin work starts.

Planned work:

- Article unlocks and pay-per-read flows.
- Website and publisher plugins.
- Examples for tips, gated downloads, and small paid actions.
- A simple reader flow that does not require copying addresses by hand.

## How to help

The roadmap is not a promise of dates. It is the current order of work.

Useful help is usually concrete: test the wallet, run infrastructure, report broken flows, improve docs, build example
integrations, or make public Atto pages easier to understand.
