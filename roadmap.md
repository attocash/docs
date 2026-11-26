---
title: Roadmap
description: Follow Atto’s completed releases, the live Atto Marketplace, and plans for developer, merchant and content payments.
displayed_sidebar: null
hide_table_of_contents: true
hide_title: true
---

import styles from '@site/src/components/Docs/Roadmap.module.css';
import {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';
import useBrokenLinks from '@docusaurus/useBrokenLinks';

export function ShippedChapters({children}) {
  const {hash} = useLocation();

  useEffect(() => {
    if (!hash) return;

    let anchor;
    try {
      anchor = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }

    const heading = document.getElementById(anchor);
    const milestone = heading?.closest('details.' + styles.milestone);
    if (milestone && !milestone.open) {
      milestone.open = true;
      heading.scrollIntoView();
    }
  }, [hash]);

  return children;
}

export function ShippedMilestone({anchor, title, date, children}) {
  useBrokenLinks().collectAnchor(anchor);

  return (
    <details className={styles.milestone}>
      <summary>
        <h4 id={anchor} className={styles.milestoneTitle}>{title}</h4>
        <span className={styles.milestoneDate}>{date}</span>
      </summary>
      <div className={styles.milestoneBody}>{children}</div>
    </details>
  );
}

export function Disclosure({summary, children}) {
  return (
    <details className={styles.disclosure}>
      <summary>{summary}</summary>
      <div className={styles.disclosureBody}>{children}</div>
    </details>
  );
}

<div className={styles.roadmap}>

<header className={styles.header}>

# Roadmap

What’s live, what we’re building, and how we got here.

</header>

<div className={styles.timeline}>

<section className={styles.stop} aria-labelledby="now">

## Now

<div className={styles.now}>

<div className={styles.feature}>
<p className={styles.liveStatus}>Live beta · public by <time dateTime="2026-11-17">Nov 17, 2026</time></p>

### Atto Marketplace {#phase-8-attomarket-beta}

Find paid work, hire help, or buy and sell digital products. Pay for approved milestones and Shop purchases directly
in ATTO or XNO.

<div className={styles.actions}>
  <a className={styles.primaryLink} href="https://atto.market/tasks">Browse tasks <span aria-hidden="true">↗</span></a>
  <a href="https://atto.market/setup">Set up Marketplace MCP</a>
</div>

<Disclosure summary="What’s next for Marketplace">

A planned catalog of paid APIs and MCP tools would let agents find
a service, inspect its price and input and output schemas, and pay to call it.

</Disclosure>
</div>

<div className={styles.card}>
<p className={styles.status}>In progress</p>

### Micropayment rails {#phase-7-micropayment-rails}

Let apps and agents pay for individual API and tool calls with fast confirmation and no protocol fees.

<Disclosure summary="Planned work on micropayment rails">

Marketplace already uses x402 for direct ATTO and XNO payments. Its integration guide covers payment receipts and safe
retries. The Atto and Nano x402 proposals are open upstream. [Marketplace integration](https://atto.market/integration#shared-direct-payment-flow), [Atto proposal](https://github.com/x402-foundation/x402/pull/715), [Nano proposal](https://github.com/x402-foundation/x402/pull/3432)

The wallet CLI and MCP already support per-payment and rolling spending limits, approved source accounts, and
request-ID recovery. [CLI guide](/build/cli), [MCP guide](/build/mcp), [First agent payment](/docs/integration/agent-payments)

- Extend the x402 flow to general-purpose APIs and tools so a service can verify a payment and return the requested resource.
- Carry forward support for multiple payment rails.
- Ship a paid demo endpoint with settlement receipts, replay protection, and clear failure behavior.
- Add recipient or service allowlists and build on existing wallet approvals and payment records.
- Publish a guide for putting an API route or MCP tool behind a small payment.

</Disclosure>
</div>

</div>
</section>

<section className={styles.stop} aria-labelledby="up-next">

## Up next

<div className={styles.plans}>

<div className={styles.plan}>

### Merchant and self-hosted payments {#phase-9-merchant-and-self-hosted-payments}

Explore a BTCPay Server integration so merchants can accept Atto on infrastructure they run.

<Disclosure summary="View merchant payment plans">

- [Explore the proposed BTCPay Server integration](/docs/integration/advanced/btcpay-server-design), including the store plugin, headless API, payment requests and invoices.
- Build the smallest useful BTCPay integration before attempting a full payment-server stack.
- Keep self-hosting as the default direction for merchants who do not want a hosted processor.

</Disclosure>
</div>

<div className={styles.plan}>

### Content payments {#phase-10-content-payments}

Once the payment rails are proven, let readers pay to unlock articles and downloads or tip creators.

<Disclosure summary="View content payment plans">

- Article unlocks and pay-per-read flows.
- Website and publisher plugins.
- Examples for tips, gated downloads, and small paid actions.
- A simple reader flow that does not require copying addresses by hand.

</Disclosure>
</div>

</div>
</section>

<section className={styles.stop} aria-labelledby="shipped">

## Shipped

<ShippedChapters>

<section className={styles.chapter} aria-labelledby="building-on-atto">

### Building on Atto {#building-on-atto}

<ShippedMilestone anchor="developer-tooling" title="Developer tooling" date={<>2026 rollout · <time dateTime="2026-05-31">May 31</time>–<time dateTime="2026-09-16">Sep 16</time></>}>

Developers can connect Atto to n8n workflows, use wallet tools from the terminal or an MCP client, and inspect the
protocol from a browser.

- Browser tools arrived August 27. WebMCP support followed September 16, exposing public content, protocol tools,
  and network queries to compatible browsers. [Browser tools](/docs/tools)
- The CLI and wallet MCP entered public beta on September 7, with locally approved wallet access and spending limits.
  [CLI guide](/build/cli), [MCP guide](/build/mcp)
- The n8n integration went live on May 31. Streaming payment triggers followed July 28.
  [n8n guide](/docs/integration/n8n)

</ShippedMilestone>

<ShippedMilestone anchor="side-quests-redesigns" title="Website and wallet redesigns" date={<>Website · <time dateTime="2026-09-12">Sep 12, 2026</time> / Wallet 2.0 · <time dateTime="2026-05-05">May 5, 2026</time></>}>

The site made it easier to find Atto’s tools, and the wallet simplified sending, receiving and staking.

##### Website redesign

The website had grown around launches, docs, metrics, blog posts, and integration pages. The redesign made the current
product easier to understand: wallet, staking, mining, explorer, metrics, integrations, and community entry points.

The goal was less marketing wallpaper and more direct paths. People should be able to land on the site and know what
Atto is, how to try it, how to earn it, how to build with it, and where to check the network.

##### Wallet redesign

The wallet is where Atto either feels usable or it does not.

The redesign focused on the everyday flows: onboarding, account overview, sending, receiving pending funds, staking,
voter selection, local work status, and mobile use. The hard parts should be visible when they matter and out of the way
when they do not.

</ShippedMilestone>

<ShippedMilestone anchor="technical-whitepaper-rewrite" title="Technical whitepaper rewrite" date={<>Published · <time dateTime="2026-09-01">Sep 1, 2026</time></>}>

The rewritten technical whitepaper explains account chains, representative voting, and how payments settle.
Atto published its MiCA disclosure as a separate document. [Technical whitepaper](/docs/whitepaper/technical)

</ShippedMilestone>

<ShippedMilestone anchor="treasury-reconciliation-automation" title="Treasury reconciliation automation" date={<>Published · <time dateTime="2026-08-12">Aug 12, 2026</time></>}>

The treasury reconciliation tool verifies Genesis and treasury account transfers against on-chain records
and regenerates the public ledger. [Treasury transparency ledger](https://github.com/attocash/transparency)

</ShippedMilestone>

<ShippedMilestone anchor="network-observability" title="Network observability" date={<>Dashboard launched · <time dateTime="2026-03-20">Mar 20, 2026</time></>}>

The public dashboard shows confirmation times, daily transaction counts, circulating supply, and distribution history.
[View network metrics](/metrics)

</ShippedMilestone>

</section>

<section className={styles.chapter} aria-labelledby="public-rollout">

### Public rollout {#public-rollout}

<ShippedMilestone anchor="phase-6-representative-program" title="Representative program" date={<>Staking launched · <time dateTime="2026-02-12">Feb 12, 2026</time></>}>

##### Staking and voter choice

The representative program moved voting from a background network detail into something users can act on. Wallet users
can choose a voter, keep custody of their ATTO, and receive rewards when they are eligible.

##### Voter transparency

Explorer voter details went live on January 28, 2026, helping users compare voters and understand how delegation
affects the network. [Voter explorer](/explorer/voters)

##### Daily rewards

Eligible rewards are generally processed daily. Use the staking docs and wallet for current rates and eligibility.
[Staking guide](/docs/staking)

</ShippedMilestone>

<ShippedMilestone anchor="phase-5-integrations" title="Integrations" date={<>Phase completed · <time dateTime="2025-10-15">Oct 15, 2025</time></>}>

##### Developer APIs and services

The developer guides added in May 2025 made Atto easier to build on. Current docs cover the node, wallet server,
work server, signer, and the APIs needed to send, receive, inspect accounts, and operate infrastructure. [Integration guides](/docs/integration)

##### Listings and discovery

August 2025 brought three public announcements. ATTO went live on LCX on August 4, appeared on CoinGecko on August 8,
and was listed on XT on August 21. Current availability can change. [LCX](/blog/atto-is-now-live-on-lcx), [CoinGecko](/blog/atto-is-now-live-on-coingecko), [XT](/blog/atto-is-now-live-on-xt)

##### Node metrics

Node operators gained expanded Prometheus metrics and peer health checks in the May 2025 node releases. [Node v1.5](https://github.com/attocash/node/releases/tag/v1.5), [Node v1.6](https://github.com/attocash/node/releases/tag/v1.6)

</ShippedMilestone>

<ShippedMilestone anchor="phase-4-public-launch" title="Public launch" date={<>Full launch · <time dateTime="2025-05-01">May 1, 2025</time></>}>

The broader launch ended the pre-release period. By then, the network, website, web wallet, faucet, explorer,
and Folding@Home rewards were open to a wider audience.

</ShippedMilestone>

</section>

<section className={styles.chapter} aria-labelledby="foundations">

### Foundations {#foundations}

<ShippedMilestone anchor="phase-3-mining-through-foldinghome" title="Folding@Home rewards" date={<>Announced · <time dateTime="2025-03-31">Mar 31, 2025</time></>}>

Atto does not use mining for consensus. Consensus uses Open Representative Voting.

The "mining" program is a distribution path. Users contribute computing power to
[Folding@Home](https://foldingathome.org), and Atto rewards completed work through the mining program. Electricity goes
toward scientific computation instead of repeated hashing for block production.

</ShippedMilestone>

<ShippedMilestone anchor="phase-2-wallet-direction" title="Web wallet direction" date={<>Released · <time dateTime="2025-01-29">Jan 29, 2025</time></>}>

Native Android and iOS wallets were the first plan. We changed direction.

Atto needed one wallet that could move faster across desktop and mobile, so the web wallet became the main wallet
surface. That kept development focused on the flows that mattered most: creating an account, receiving funds, sending
ATTO, and later, choosing a voter for staking.

</ShippedMilestone>

<ShippedMilestone anchor="phase-1-explorer-and-platform-stabilization" title="Explorer and platform improvements" date={<>Phase completed · <time dateTime="2024-12-08">Dec 8, 2024</time></>}>

##### Explorer

The [explorer](/explorer) made the network visible. Users could inspect accounts and transactions without asking an
operator to check node logs.

##### Faucet and wallet improvements

The faucet and wallet were tightened up around the basic loop: get a small amount of ATTO, open a wallet, send it,
receive it, and see the transaction on the explorer.

</ShippedMilestone>

<ShippedMilestone anchor="phase-0-pre-release" title="Pre-release" date={<>Mainnet and public pre-release · <time dateTime="2024-11-23">Nov 23, 2024</time></>}>

##### Public website

The first website gave Atto a home for the whitepaper, docs, and community links. The public pre-release announcement
introduced a working desktop wallet, faucet, and contribution rewards. [Pre-release announcement](/blog/pre-release)

##### Live network

Atto opened mainnet to early users at genesis. The first public treasury records include funding for the faucet and
the contribution rewards bot. [Technical whitepaper](/docs/whitepaper/technical), [November 2024 treasury ledger](https://github.com/attocash/transparency/blob/main/log/2024-11.csv)

</ShippedMilestone>

</section>

</ShippedChapters>

</section>

</div>

<section className={styles.help} aria-labelledby="how-to-help">

## How to help

Test the wallet, run infrastructure, report broken flows, improve the docs, or build an example integration.
See the policy for work that may qualify for rewards. [Contribution Rewards Policy](/docs/reward-for-contributions)

</section>

</div>
