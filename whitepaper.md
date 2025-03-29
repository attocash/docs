---
sidebar_position: 1
---

# Whitepaper

**DTIF G3JQMFD76**
**ISIN XTB89R03SZ10**

## Introduction

In the world of digital payments, **micropayments** – transactions of very small value – have long been considered
impractical. Traditional payment networks (like credit cards) and even early cryptocurrencies impose fees and delays
that make sending a few cents or pennies infeasible.
**Atto** is a cryptocurrency designed from the ground up to solve this problem. Atto aims to fulfill the original
promise of cryptocurrency as **fast, cheap, and accessible digital cash for everyone**. Whether you're buying a cup of
coffee face-to-face or tipping someone a fraction of a cent online, Atto enables these payments with **near-instant
confirmation and zero fees**.

Atto’s core design focuses on **speed, efficiency, and sustainability**. It achieves high performance through a unique
consensus mechanism called **Open Representative Voting (ORV)** and an innovative ledger architecture where each user
has their own chain of transactions.
This means **transactions are finalized in under a second in real-world conditions**, without anyone having to pay
network fees. Moreover, Atto avoids energy-hungry mining; the network’s power usage is so low that it could be run on
the equivalent of a small solar farm (only about the energy of six average households).
This makes Atto not only fast and feeless, but also environmentally friendly and sustainable for the long term.

Importantly, Atto is not just a theoretical proposal – it is already a **live, working network**. The project launched
in late 2024 and has since rolled out a public block **explorer**, a user-friendly web **wallet**, and a **faucet** that
lets anyone claim free Atto tokens to try out the system.
The network currently operates with a small number of nodes and representatives securing the ledger, and the core
functionality (sending, receiving, and confirming transactions) is fully operational. The following sections of this
whitepaper will explain how Atto works under the hood, highlighting the key features and design elements that make it
uniquely suited for micropayments and face-to-face transactions.

## Key Features and Design Goals

- **Feeless Transactions:** Atto eliminates transaction fees entirely. Every payment, no matter how small, can be sent
  without incurring a cost to the user. This makes **microtransactions** (even fractions of a cent) viable, a stark
  contrast to conventional payment methods that have high processing fees for small amounts.
  In Atto, **it's your money – you can send it without any deductions**.

- **Near-Instant Confirmation:** Speed is a top priority. The network achieves **sub-second confirmation times** for
  typical transactions.
  This low latency means users are not left waiting; payments can be accepted on the spot, which is crucial for
  in-person transactions like retail purchases or splitting a bill with friends.

- **Micropayment Optimized:** The system is designed specifically for handling high volumes of tiny payments. The
  protocol supports a high degree of divisibility (each Atto token can be split into 10^9 units) to enable very
  fine-grained payments. Because there are no fees and fast confirmations, Atto can power use-cases like pay-per-use
  services, tipping, IoT payments, and other scenarios where value transfer might be just pennies or less.

- **Face-to-Face Payment Friendly:** Atto’s combination of instant finality and offline-capable wallet designs makes it
  ideal for point-of-sale and face-to-face payments. A customer can pay a merchant via a quick QR code scan, and the
  transaction will be **confirmed within milliseconds**, providing a smooth experience comparable to (or faster than)
  tapping
  a contactless card. The **finality** of Atto transactions (once confirmed by the network majority) ensures that the
  recipient can trust the payment irreversibly, which is important in physical exchanges.

- **Open Representative Voting Consensus:** Instead of wasteful mining, Atto secures its ledger through a
  **collaborative consensus** mechanism. Users vote on transactions via their chosen **representatives**, achieving
  consensus once a supermajority (around 65%) of weighted votes is reached.
  ORV (Open Representative Voting Consensus) provides decentralized security while avoiding the high energy and hardware
  costs of Proof-of-Work. This keeps the
  network efficient and **eco-friendly**.

- **Scalable, Parallel Ledger Architecture:** Atto uses an **account-chain model** where each account (user) has its own
  blockchain. This means there is no single sequential chain bottleneck – multiple transactions can be processed in
  parallel across the network without conflict. The architecture naturally **scales** with the hardware, allowing a high
  throughput of transactions and ensuring that even as the user base grows, the network remains quick and responsive.

- **Eco-Friendly by Design:** With no mining and minimal computational work required, Atto’s environmental footprint is
  tiny. The network’s nodes use only a few kilowatt-hours each, meaning the entire global system could run on modest
  energy resources.
  This stands in stark contrast to traditional Proof-of-Work blockchains that consume significant electricity. Atto
  proves that a cryptocurrency can be **green and sustainable** while still delivering top-tier performance.

- **Live Network and Accessibility:** Atto is already **operational and accessible** to users. There are official
  wallets (including a web wallet that requires no installation) and an open blockchain explorer for transparency.
  The **faucet** distribution allows newcomers to obtain a small amount of Atto for free and test the system.
  The project rewards community participation (like fixing bugs or improving documents) with tokens, further engaging
  users in the ecosystem. All code is open-source, inviting developers to run nodes, build applications, and help
  improve the network.

With these key features, Atto sets out to redefine digital cash, focusing on the original goals of cryptocurrency: a
fast, borderless, and decentralized means of exchange that anyone can use. Next, we dive deeper into how these features
are implemented at the technical level.

## Consensus Mechanism: Open Representative Voting (ORV)

Atto achieves consensus through a system called **Open Representative Voting (ORV)**, which is central to its ability to
be fast, feeless, and secure. ORV is a form of delegated voting: every user can participate in securing the network by
assigning their “voting weight” (which is proportional to their account balance) to a representative node of their
choice. These representatives are specialized nodes trusted by the community to vote on transactions and validate blocks
on behalf of others.

In practice, when a transaction is broadcast in the network, representatives vote to confirm it. A transaction is
considered confirmed when a threshold of votes is reached – specifically, at least
**65% of the total observed voting weight** in the network must agree on the transaction.
This threshold mechanism protects against Sybil attacks (where a malicious actor might create many fake nodes) because
what matters is the weight of votes (which comes from real economic stake in the system), not the sheer number of nodes.
Some key aspects of ORV in Atto include:

- **Delegated Voting and Trust:** Users keep control by choosing a representative. If you hold Atto, you can either run
  your own voting node or simply pick a reliable representative to vote on your behalf. **No staking or lock-up is
  required** – the voting weight is your account balance, and it changes dynamically as you spend or receive Atto.
  This design means even users on low-power devices can contribute to consensus by delegating, maintaining
  decentralization without everyone running a heavy node.

- **Fast Finality:** Because representatives are online and voting continuously, consensus is reached very quickly. Once
  the network sees the **supermajority of ~65%** vote in favor of a transaction, that transaction is confirmed final.
  In normal conditions, this process happens in a fraction of a second. There is no need to wait for multiple blocks or
  lengthy confirmations as in Proof-of-Work systems – one round of voting suffices for irreversibility. This is what
  allows Atto to have near-instant settlements.

- **Energy Efficiency (No Mining):** ORV replaces the work done by miners in other blockchains with a lightweight voting
  process. Representatives do **not** compete with expensive computations; they simply sign votes. This means securing
  the network does not consume significant energy. As noted earlier, **no mining is required at all**, and the overall
  energy usage of the network remains extremely low.
  Nodes can run on ordinary hardware (even something like a small server or Raspberry Pi), and consensus is maintained
  through cooperation rather than competition.

- **Security and Sybil Resistance:** The voting weight threshold (65%) is fundamental for security. An attacker would
  need to control a very large portion of the total Atto supply (or persuade many users to delegate to them) to
  fraudulently confirm false transactions. This is economically impractical, making attacks expensive and easily
  detectable. Moreover, all votes are cryptographically signed by representatives and auditable by the network, ensuring
  transparency. The **open representative system** also encourages decentralization over time – if any representative
  misbehaves or goes offline, users can switch their delegation to more reliable nodes, preventing any single actor from
  holding the network hostage.
  Representatives have a strong incentive to act honestly, since their voting power is delegated by user trust;
  misbehavior would result in losing that trust (and weight) quickly.

- **Decentralized Governance:** ORV has a built-in element of governance – it is the users who ultimately decide who the
  top representatives are, through their choice of delegation. In this way, the community collectively governs which
  nodes have influence. There is no central authority appointing validators; **anyone can become a representative node**
  by running the software and attracting votes from token holders. This open access keeps the network aligned with the
  community’s interests and promotes **resilience**: as more users join and distribute their votes, control naturally
  spreads out. (We discuss Atto’s approach to decentralization further in a later section.)

Through ORV, Atto strikes a balance between **speed** and **decentralization**. By leveraging community-chosen
representatives, Atto can confirm transactions extremely fast without sacrificing security or relying on
energy-intensive processes. This consensus mechanism is a proven design (successfully used by Nano and others) that has
been refined in Atto’s implementation to enhance performance and robustness.

## Ledger Structure and Transaction Model

Under the hood, Atto’s ledger is structured in a fundamentally different way from the traditional blockchain used by
Bitcoin or Ethereum. Instead of one single chain of blocks that all transactions compete to be added to, Atto uses an *
*account-chain model** (also known as a block-lattice structure). In this design, **each account (address) has its own
blockchain**, recording only that account’s transactions.
Every time you send or receive funds, you add a block to *your* account’s chain. This architecture provides several
benefits: it eliminates global contention (no need for the whole network to agree on one next block at a time), allows
transactions to be processed in parallel, and results in extremely fast confirmations.

**Parallel, Independent Account-Chains:** Because every account maintains its own sequence of blocks, many transactions
can be processed simultaneously across the network. There is no single “longest chain” that all nodes fight to extend.
Instead, nodes keep track of the state (latest block) of each account’s chain. If Alice wants to send funds to Bob, that
action only involves updating Alice’s chain (for the send) and Bob’s chain (for the receipt). No other accounts are
immediately affected, which means **Alice and Bob’s transaction doesn’t have to wait for unrelated transactions between
Carol and Dave**, for example. This massively **improves throughput and latency** – there is essentially no network-wide
congestion from transactions piling up.
Each account-chain can grow on its own timeline. The network nodes, through ORV consensus, ensure that conflicting
updates to the same account are prevented and that every send is matched with a corresponding receive.

**Block Types and Double-Entry Transactions:** Atto’s ledger employs a handful of specialized block types to represent
different actions in an account, simplifying the logic and ensuring consistency. The four primary block types are:
**Open, Send, Receive,** and **Change**.

- An **Open block** is the first block that creates a new account on the network. When an account receives Atto for the
  first time, the recipient publishes an Open block to initialize their account chain (setting their account’s public
  key and an initial representative). This is analogous to opening a new ledger for that user.

- A **Send block** deducts an amount from an account’s balance to transfer to someone else. It references the previous
  block in the sender’s chain and reduces the sender’s balance by the sent amount, effectively creating an outgoing
  transaction. A crucial aspect of Atto (inherited from Nano’s design) is that sending funds is a one-sided action – the
  funds leave the sender’s account and are marked as “pending” for the receiver.

- A **Receive block** is how the recipient actually claims the funds from a pending send. When Bob sees that Alice sent
  him some Atto (the transaction will be visible as pending to Bob’s node/wallet), Bob’s wallet will create a Receive
  block in Bob’s account chain to add those funds to his balance. The receive block explicitly references the hash of
  Alice’s send block to tie them together. This two-step send/receive process implements a form of **asynchronous
  double-entry bookkeeping**: Alice’s ledger shows a debit and Bob’s shows the corresponding credit.
  Both sides of the transaction are recorded, which prevents any ambiguity or double-spending – a send without a
  matching receive remains incomplete, and funds cannot be spent twice.

- A **Change block** allows an account holder to change their representative (the node that votes for them in
  consensus). It doesn’t affect the balance, only the metadata of the account’s settings. A user might issue a Change
  block to switch to a different representative if, for example, their current one goes offline or they prefer to
  support another node. This mechanism ensures governance remains flexible – **every user can redirect their voting
  power at any time** by publishing a change in their account chain.

Each block (regardless of type) is cryptographically signed by the account owner, ensuring authenticity, and includes a
**proof-of-work** (PoW) puzzle solution. The PoW attached to each block is very small (far easier than Bitcoin’s mining
puzzles) and is mainly used as an anti-spam measure. It requires a device to do a bit of computation (on the order of a
few milliseconds to a second of work, depending on hardware) to create a valid block. This minor work helps prevent
someone from creating millions of bogus transactions per second, as they would need to expend computational effort for
each one.
In normal use, the PoW is unnoticeable (wallet software usually computes it in the background), but it dramatically
increases the cost for an attacker trying to flood the network.

**Transaction Process:** A complete transfer in Atto actually involves two blocks (a send and a receive) and the ORV
voting to confirm them. For example, if Alice pays Bob 10 Atto:

1. Alice's wallet creates a **Send** block deducting 10 from her balance (and references her latest previous block).
   This block is signed by Alice and broadcast to the network with a small PoW. At this moment, the 10 Atto is deducted
   from Alice's account and marked as awaiting reception by Bob.

2. The network quickly runs the ORV consensus to confirm Alice’s send block. Representatives vote, and once ~65% weight
   approves, the send block is cemented as confirmed. Now the funds are available for Bob to receive.

3. Bob’s wallet (which sees the pending incoming transaction) creates a **Receive** block, adding the 10 Atto to Bob’s
   balance. This block is signed by Bob and also broadcast with a PoW. The receive block will similarly be confirmed by
   ORV voting. Once confirmed, Bob’s account is updated with the new funds.

From the users’ perspective, this whole sequence feels instantaneous – a good wallet will broadcast the send and then
auto-detect and broadcast the receive in a seamless flow. The double confirmation (one for send, one for receive)
typically occurs so fast that the payee can be sure of the payment in a second or two. This design also means that **if
Bob is offline**, Alice can still send the funds (her send block will remain unreceived but pending). When Bob comes
online later, his wallet can publish the receive block to claim the funds. Thus, Atto handles asynchronous activity
gracefully, which is useful for intermittently connected devices.

The account-chain model and these block types give Atto a structural advantage in terms of **throughput** and
**latency**: transactions don't bottleneck each other, and simple operations (like a balance update in one account)
don't require global coordination beyond the lightweight voting process. The result is a ledger system capable of
handling a large volume of small transactions, exactly what is needed for a micropayment-focused currency.

## Performance and Security Considerations

Designing a network for micropayments requires careful attention to performance (to handle high volume) and security (to
prevent abuse, since feeless systems can be targets for spammers). Atto incorporates several features and
countermeasures to ensure the network remains smooth and secure even under load or attack:

- **High Throughput & Low Latency:** As discussed, the parallel account-chain architecture allows Atto to process many
  transactions at once. There is effectively no theoretical limit imposed by the consensus on how many different
  transfers can be underway simultaneously – only one transfer per account at a time is constrained. This means someone
  could be sending money at the same time someone else is, without waiting on each other. Confirmation times remain only
  a function of the ORV voting speed, which is kept very fast through efficient networking among representatives. In
  tests and early usage, Atto transactions routinely confirm in well under a second, and the system is designed to
  maintain this performance even as it scales to more users.

- **Lightweight Proof-of-Work per Transaction:** Every transaction (block) requires solving a small Proof-of-Work puzzle
  before it’s accepted by the network. Unlike Proof-of-Work mining, this is not used to choose who gets to add a block,
  but simply to add a slight *computational cost* to creating transactions. The purpose is to throttle the rate at which
  any single actor can spam the network with transactions. Because there are no fees, without PoW an attacker could try
  to overwhelm the system by spamming millions of transactions. PoW mitigates this risk by making spamming
  computationally expensive – the attacker would need significant processing power to generate a high volume of
  transactions, giving defenders time to react. Honest users sending normal volumes are unaffected, as the PoW is so
  minimal that even a mobile phone can handle transactions comfortably.

- **Bounded Queues and Prioritization:** The Atto protocol uses **bounded queues** to manage transactions efficiently
  under heavy load. Transactions entering To handle heavy load, the Atto protocol uses bounded queues that categorize
  transactions based on the account balance (plus send amount if it's send block). Each balance range has
  its own bucket, and each bucket has a maximum size of 1000 transactions. When a bucket is full, lower-priority
  transactions within that group are discarded. Priority within a bucket is determined by the difference between the
  node’s time when transaction was received and the transaction’s timestamp. Transactions that appear significantly
  older or in the future are deprioritized. This time-based sorting ensures that timely, legitimate transactions are
  kept, while stale or suspicious ones are dropped first. This strategy helps maintain network responsiveness during
  high-volume periods and protects against spam or denial-of-service attempts using pre-computed transactions or
  low-value spam floods.

- **Anti-Spam and Anti-DoS Measures:** Beyond PoW and queuing, Atto nodes have additional rules to combat malicious
  behavior:
  - *Transaction Replay Protection:* Each account chain has a **height (sequence number)** for its blocks, and nodes
    remember the hash of the latest block seen.
    If an attacker tries to resend an old transaction or duplicate a valid one (replay attack), the node will notice
    that the account’s sequence number is outdated or the hash was already seen, and reject it. This prevents attackers
    from simply copying transactions and rebroadcasting them.
  - *Timestamp Checks:* Atto blocks include timestamps, and nodes will reject transactions with timestamps that are too
    far in the future (more than 1 minute ahead of the current time).
    This prevents attackers from pre-computing a long sequence of blocks to flood the network later. Any such
    pre-computed spam transactions would either be dropped for being out-of-date or be given low priority if their
    timestamps are not near the present.
  - *Rate Limiting and Blacklisting:* Nodes monitor the rate of messages (such as votes or transaction broadcasts) from
    their peers. If a particular node sends messages at an abnormally high rate (far above the network average), it can
    be **flagged as a spammer and blacklisted** temporarily. This automated rate limiting stops
    malicious nodes from flooding genuine nodes with traffic. Honest nodes behaving within normal parameters won’t
    trigger this.
  - *Efficient Gossip Network:* Atto uses WebSocket to communication between nodes, which allows it to integrate with
    DDoS protection techniques and efficiently propagate messages. By keeping the bandwidth requirements low and using
    protocols that can be guarded by common DDoS mitigation (like WebSocket proxies), the network remains robust even
    under denial-of-service attempts.

- **Consistency and Finality:** Once a transaction is confirmed through ORV, it is **final** – there is no forking or
  possibility of reversal under normal operation. The account-chain design means that conflicts (two different sends
  from the same account, etc.) are resolved by the network by only accepting one sequence of blocks per account. Atto’s
  consensus rules simply will not allow an account to double-spend; a second conflicting transaction from the same
  account will be rejected outright by nodes. This property is important for security, as merchants and users can
  transact with confidence that once they see confirmation, the payment is irreversible and settled. In the rare event
  of a network partition or outage, the design of ORV ensures that when connectivity is restored, votes will determine
  the valid history for any accounts that might have forked, and because of the representative weight, the honest
  majority will prevail.

In summary, Atto is engineered to **maintain high performance while preventing abuse**. Feeless systems can be
attractive targets for spammers, but by combining techniques like mandatory PoW, prioritization of transactions, and
robust consensus rules, Atto keeps the network secure and spam-free. These measures ensure that even as usage grows,
users will experience the same fast, reliable service, and attackers will find it difficult to significantly disrupt the
network.

## Use Cases: Micropayments and Face-to-Face Transactions

Atto’s feature set unlocks a variety of use cases that are challenging for traditional financial systems and other
cryptocurrencies. Two areas where Atto shines are **micropayments** (very small payments, often online or automated) and
**face-to-face transactions** (point-of-sale or in-person money exchanges). Below, we explore how Atto benefits these
scenarios:

### Enabling True Micropayments

Micropayments have been touted as a potential internet revolution – imagine being able to pay a few cents to read an
article instead of seeing ads, tipping
creators $0.10 for a good post, or IoT devices paying each other fractions of a penny for data and services. In practice, however, such use cases have been stymied because moving tiny amounts of money is inefficient on legacy systems. Credit card networks have minimum fee structures (often $
0.20 or more per transaction) that make anything under a dollar
uneconomical.
Even cryptocurrencies like Bitcoin or Ethereum, in their base layer, have variable fees that can exceed the value of a
micropayment, and confirmation times that are too slow for interactive use.

Atto removes these barriers. With **zero fees**, you can send **any amount** of value – even ¥0.000001 (a millionth of
an Atto token) – and the recipient will get exactly that amount. This opens the door to a true **micropayment economy**.
Content platforms could charge mere cents for access without forcing users into subscriptions, or implement pay-per-use
pricing models that were previously impossible. For example, a cloud API could bill clients per request in real-time
using Atto, deducting a tenth of a cent for each call. A video game or app could reward users with small Atto payments
for engaging with content or completing tasks, knowing those rewards cost nothing to distribute. These scenarios are now
viable because the cost overhead is zero and the transaction can clear immediately.

Moreover, Atto’s high throughput means it can handle the volume if, say, a million users are each making tiny
transactions frequently (something that might occur with IoT devices or a popular micro-tipping platform). The network’s
design ensures that these countless microtransactions do not clog one another. By embracing micropayments, Atto has the
potential to facilitate new business models and services that were not practical before.

### Instant Payments in Person

For payments in physical retail or between individuals face-to-face, speed and finality are crucial. In a typical
cryptocurrency like Bitcoin, waiting 10 minutes (or often longer) for a confirmation is obviously a non-starter for
buying a coffee. Other solutions like Lightning Network channels improve speed but add complexity and require pre-funded
channels. Traditional electronic payment methods (credit cards, mobile payment apps, etc.) are generally fast at the
point of use, but they rely on centralized intermediaries, and merchants pay fees for each transaction.

Atto offers a decentralized alternative that is **fast enough for in-person use**. Thanks to ORV consensus, a payment
can be confirmed in seconds or less, which is on par or faster than processing a card transaction. For instance, if you
purchase an item from a store using Atto, by the time the cashier finishes saying the total and you approve the payment
on your phone, the merchant’s device can already receive confirmation that the payment is complete. There’s no need to
make change (as with cash) or wait for terminal approvals and signatures (as with cards). The result is a smooth
customer experience – essentially **cash-like immediacy with digital convenience**.

Because Atto transactions are final after confirmation, merchants can trust the payment similar to how they trust cash
in hand. There's no risk of chargeback fraud or reversal by a third-party, since there is no central party who can
reverse the transaction. For the consumer, using Atto could be as simple as scanning a QR code or tapping their phone (
if a wallet app supports NFC or QR display). The barrier to using Atto in these scenarios is low, given that a user only
needs a smartphone with an internet connection and an Atto wallet app.

Face-to-face transactions also benefit from Atto’s lack of fees: small businesses or individuals can accept digital
payments without sacrificing a percentage cut to payment processors. For example, a street vendor could accept
a $2 payment via Atto and get the full $2, whereas with a card payment they might lose perhaps $0.30 of it in fees. Over
time and volume, that becomes a significant saving. This makes Atto particularly attractive for small-value sales,
peer-to-peer transactions (like paying someone back for lunch), and community economies.

### Global and Accessible to All

Both micropayments and everyday payments are further enhanced by Atto’s global nature. As a cryptocurrency, Atto isn’t
bound by any single country’s banking system. Anyone with internet access can use it, and payments can be sent anywhere
in the world instantly. This means a user in one country can pay a few cents to a content creator in another country
just as easily as paying someone next door. Cross-border micropayments (or even larger payments) happen without any
additional friction – no extra fees, no delays for currency conversion. This could empower content creators,
freelancers, and entrepreneurs worldwide to transact freely on a small scale, whereas current international payment fees
would eat up a small payment.

Atto’s accessibility also comes from its commitment to user-friendliness. The project provides simple wallet tools and
even a free faucet distribution for newcomers, which lowers the barrier to entry. A person who is new to crypto can
access an Atto web wallet, get a small amount of Atto from the faucet for free, and make their first micro-transaction
within minutes. By removing cost and complexity, Atto aims to be a cryptocurrency that **anyone can use for daily
transactions**, fulfilling the promise of inclusive finance. In communities with less access to banking, a system like
Atto could enable digital payments using only mobile phones, with negligible cost – potentially a game-changer for
financial inclusion.

In summary, Atto is built to excel in use cases where traditional systems falter: it enables *true micropayments* by
removing fees and enabling massive scalability, and it fits *real-world payment scenarios* by offering instant, final
confirmation in a decentralized manner. These capabilities position Atto as a serious contender for powering the next
generation of digital commerce, from the smallest of transactions to everyday point-of-sale purchases.

## Tokenomics and Distribution

Atto’s economic design (tokenomics) and distribution model were carefully chosen to support its role as digital cash and
to encourage widespread adoption. Unlike mined cryptocurrencies,
**the entire supply of Atto was created at the start (genesis)**, and no new tokens will be created (non-inflationary
model).
The total supply is fixed at **18,000,000,000 Atto** tokens, each divisible into 10^9 fractional units (nano-atto, so to
speak). This high divisibility (9 decimal places) ensures that even as Atto gains value, users can transact in tiny
fractions for micropayments.

The distribution of this supply is structured to foster growth and decentralization over time. The initial allocation
was divided into several portions with different
purposes:

- **Faucet (15% of supply):** A significant share of tokens is being given out through a public faucet over time (
  scheduled for about the first year).
  This means anyone can claim a small amount of Atto for free. The purpose is to **jumpstart adoption** by seeding the
  user base – new users can try Atto without having to buy in, which lowers the barrier to entry. It also distributes
  tokens widely, which is healthy for decentralization.

- **Voter Incentives (20% of supply):** To encourage community participation in consensus, a portion is reserved to
  reward those who help secure the network. Over a period of up to 10 years, these tokens will be gradually distributed
  to users or nodes that participate in voting (ORV) and contribute to network security.
  This aligns economic incentives with decentralization – as more people run nodes or actively engage in consensus, they
  receive a share of tokens, broadening ownership.

- **Development Fund (40% of supply):** This allocation is set aside for ongoing development, infrastructure, and
  ecosystem growth. Building a sustainable network requires funding developers, running servers, and promoting the
  platform. The development fund ensures that the team has resources to improve Atto over time, add features, and scale
  the network, all while being transparent about how these funds are used. It is effectively an investment in the
  project’s future capabilities (e.g., further optimization, community programs, etc.).

- **Community Rewards (24% of supply):** Another large portion is allocated to community-driven contributions and
  bounties.
  Atto actively rewards those who help the project – whether by finding and reporting bugs, contributing code or
  documentation, creating educational content, or helping with outreach. For example, a security researcher who
  discovers a vulnerability might earn a substantial Atto reward. Likewise, someone building a useful app on Atto or
  integrating it into a service could be rewarded. This approach leverages the wider community’s talents and creates a
  collaborative ecosystem where contributors are recognized in a meaningful (financial) way.

- **Founder Allocation (1% of supply):** A very small portion was reserved for the project’s
  creator/founder.
  Notably, this is just 1%, which is modest compared to many projects – it signals an intent to avoid large centralized
  holdings and to show that the founder’s stake is limited. (This 1% also aligns the founder’s incentives with the
  long-term success of the network without giving them outsized control.)

All token movements and distributions are made transparently. The Atto team maintains a **public transparency log** (
ledger of distributions) that anyone can review. This log records how tokens from the various allocations are being used
over time. By doing so, Atto commits to openness and community trust – participants can verify that, for instance, the
development fund is being used for development, or how much has been given out via the faucet to date.

This distribution model has immediate implications for Atto’s **current network state**. In the early phase, since a
large number of tokens are in the faucet, voter, and reward allocations (which are controlled by the project initially),
the network’s control is somewhat **concentrated**. The Atto team is essentially bootstrapping the network, operating
initial representative nodes and overseeing distribution. However, as tokens get dispersed to users worldwide through
the faucet and rewards, and as those users start staking their claim in consensus (by delegating or running nodes), the
network will **decentralize progressively**.

The goal outlined by the team is to reach a **Satoshi Nakamoto coefficient of 10** (at least 10 independent entities
would need to collude to control a majority) within about three years.
This means they intend for governance power to be much more distributed as adoption grows. The economic incentives are
in place to achieve that: tokens are literally being handed out to those who join and contribute, resulting in a more
diffuse ownership.

In summary, Atto’s tokenomics support its use as a currency (high supply, high divisibility, no inflation) and its
distribution plan prioritizes adoption and decentralization. By giving users free entry via the faucet and rewarding
active participation, Atto is cultivating a broad base of stakeholders. This not only helps in marketing and growth
(more people trying and using it) but also underpins the network’s security model – the more widely tokens (and thus
voting weight) are held, the more decentralized and robust the consensus becomes. It’s a cycle where adoption begets
more decentralization, which begets trust and further adoption.

## Governance and Decentralization

Governance in Atto is closely tied to the consensus mechanism and distribution of tokens. In essence, **governance is
user-driven via the ORV system** – each token holder has a voice (directly or through a representative) in what
transactions are confirmed and, by extension, in any consensus rule changes or network policies that might be voted on
by representatives. However, beyond the technical consensus, there are aspects of network governance and project
direction to consider, especially during the early phases when the founding team plays a larger role.

Currently, Atto is in a **transitional phase from a centralized launch to a decentralized network**. At launch, the
founding team controlled most of the supply and ran the key nodes, simply because the tokens had not yet been widely
distributed. This is intentional and common in new networks – it prevents attacks at birth and allows the system to
bootstrap. However, the project is committed to **diluting that early centralization quickly**. The distribution model
(faucet, voter rewards, etc.) is the primary tool to achieve this, pushing tokens and influence out to the community
over time, as described above.

In terms of measuring decentralization, the team uses metrics like the **Nakamoto coefficient** (which counts how many
entities control a significant portion of voting power). The target of reaching a coefficient of 10 means they aim for a
state where no fewer than 10 independent parties collectively hold the majority of voting weight.
In practical terms, this would indicate a healthy spread of large token holders or representatives. Achieving this will
likely come as the faucet distributes tokens to thousands of users and as some of those users (or groups of users)
emerge as significant representatives. It’s a gradual process, but one that is actively incentivized.

**Representative Accountability:** A key governance feature of Atto’s design is that **users can change their
representatives at any time (via a Change block)**. This keeps representatives accountable to
those who delegate to them. If a representative were to act against the interests of the network – for example, by
colluding to censor transactions or going offline frequently – delegates can shift their voting weight to a more
reliable representative. This dynamic creates a kind of election cycle that is continuous: representatives must act with
integrity and maintain community trust or risk losing their influence. In effect, the power that representatives have is
**lent** to them by users, not permanently owned. This aligns governance with the broader community’s will.

**Protocol Development and Updates:** Atto’s software is open source and the development process is intended to be
collaborative. While early on the founding team will be the one proposing and making most changes (simply because they
are the most familiar with the codebase), over time the goal is to involve the community in protocol upgrades.
Significant changes to the network (for instance, adjusting consensus parameters or adding new features) would likely be
discussed openly and could even be put to a vote among representatives if needed. The ORV mechanism could serve as a
signalling system for consensus changes – much like how other blockchains rely on node operators to adopt updates. If
the majority of voting weight agrees on a change, it can be implemented knowing the network will follow along.

**Legal and Ethical Governance:** While not a blockchain governance issue per se, it's worth noting that Atto as a
project adheres to principles of transparency and fairness (often associated with good governance in the broader sense).
The team is forthright about the project’s status and progress – for example, acknowledging in documentation that it
started centralized and needs to decentralize.
This honesty helps set the expectations with the community and invites them to participate in the journey.

In conclusion, governance in Atto is designed to evolve. Early on, the core team is steering the ship, but with a clear
roadmap to hand over the reins to the community of users and node operators. The representative system means that
ultimately, **the power in the network lies with the token holders**, and as distribution progresses, this power becomes
more diffuse. Atto’s approach is to guide the network through its infancy and then let it grow into a self-governing,
decentralized ecosystem – one where decisions are made collectively and no single entity has outsized influence. This is
aligned with the project’s philosophy of being a currency *for everyone*, not controlled by any corporation or small
group.

## Network Status and Accessibility

As of 2025, the Atto network is fully operational and accessible to the public. This section provides an overview of the
current status of the network and the resources available for users and developers to engage with Atto.

**Launch and Maturity:** The Atto mainnet was launched in late 2024, initially in a "pre-release" phase where core
features were live and the community was invited to participate early.
Since then, Atto has matured rapidly. The basic functionality – creating accounts, sending and receiving transactions,
and consensus via representatives – has proven to work reliably. The network has processed a growing number of
transactions as more users have onboarded through the faucet and community events (such as token
giveaways).

There will be public lab stress tests to ensure the network can handle load, and so far the results have demonstrated
that Atto's design is robust under pressure (thanks to the anti-spam measures and efficient consensus).

**Network Nodes and Representatives:** Currently, the Atto network is maintained by a mix of nodes run by the core team
and an increasing number run by community members. In the very beginning, the team operated most of the nodes to ensure
stability. For example, as noted under environmental impact, there were 11 known nodes (plus some supporting hardware)
as of late 2024.
Now in 2025, community-run nodes are coming online, especially as the software is open source and people are
incentivized by the voter rewards to run their own representatives. The network topology is distributed globally – nodes
communicate via the internet and collectively uphold the ledger. An official network explorer provides real-time
information on nodes and voting weights, so anyone can see how decentralized the network is becoming. Atto’s consensus
algorithm allows even those running non-voting nodes (nodes that don't have significant weight delegated) to contribute
by relaying transactions and votes; it is expected that the number of nodes will grow significantly as the project
continues to encourage participation.

**Wallets and User Access:** On the user side, **Atto provides multiple wallet options** to cater to different
preferences:

- The **Web Wallet** is a convenient way for newcomers to start. It runs in a browser, meaning no download is
  required.
  Users can create an account, secure their mnemonic (secret phrase), and begin sending/receiving Atto immediately. The
  web wallet was introduced to lower the entry barrier, as it avoids the hesitation some have in installing unknown
  software.
- For those who prefer or require it, **Desktop Wallets** are also available (for Windows, macOS, Linux). These might
  offer more advanced features and direct node connectivity for power users.
- All official wallets are non-custodial – meaning the user holds their private keys. This aligns with the philosophy of
  self-sovereignty in crypto. The wallets are designed to be user-friendly, with simple interfaces resembling familiar
  payment apps.

Using any of these wallets, users can easily access the faucet from directly within the app or via the website to claim
free tokens and start transacting. Because transactions are feeless, even a small drip of tokens from the faucet is
enough to make numerous transactions, demonstrating the capability of the network.

**Block Explorer and Transparency:** The **Atto Explorer** is a web-based blockchain explorer that was launched to
provide transparency and insight into the network.
Through the explorer, anyone can search for transactions, view account balances (addresses are pseudonymous), and
monitor network stats such as transaction throughput, confirmation times, and representative voting weights. The
explorer makes the blockchain data human-readable and accessible, which is important for trust – users can verify that
their transactions went through, and curious observers can inspect how active the network is. It also helps developers
by providing an easy way to debug or analyze network behavior.

**Developer Tools:** Atto is developer-friendly. The project offers a documented **Node API** and
libraries/SDKs (with an official library on GitHub for those who want to build applications or services on top of Atto.
This means entrepreneurs and developers can integrate Atto payments into websites or apps (for example, for e-commerce,
tipping, or IoT use cases) with relative ease.

**Real-World Testing and Adoption:** Even at this early stage, Atto has seen real-world trial runs. Community members
have reported using Atto to transact small amounts for fun or informal exchanges (like tipping someone online, or a
couple of users testing sending money across different countries). These small-scale experiments have demonstrated the
promised speed and ease of use – it's quite a novel experience for many to send money without any fees and have it
confirmed almost instantly. As the ecosystem grows, we hope more formal adoption, such as merchants accepting
Atto (particularly those who deal in low-value items or want to avoid card fees), content creators putting up Atto QR
codes for tips, and possibly integration into existing payment platforms as a transfer option.

In summary, the Atto network is **up and running**, with all the essential components in place for users to join and use
it today. The focus now is on expanding and decentralizing the network further, improving the user experience, and
fostering adoption. Accessibility has been a key consideration – from free token distribution to easy-to-use web
wallets – and this will remain important as Atto aims to reach a broad audience. The fact that Atto is live lends
credibility to the project’s promises; it’s not just theory, but a practical system one can test firsthand. This
real-world presence will be crucial in gaining trust and proving that Atto’s model of instant, feeless micropayments is
not only possible, but ready for the world to use.

## Conclusion

Atto represents a **significant evolution in cryptocurrency tailored for payments**. By combining the feeless, rapid
transaction model pioneered by Nano with its own set of enhancements and a fresh start, Atto delivers a digital currency
that feels like digital cash: you can hand it over instantly, in any amount, without friction. Throughout this
whitepaper, we have highlighted how Atto’s technical architecture – the ORV consensus, account-chain ledger, and spam
countermeasures – works in harmony to achieve what legacy systems and many other blockchains cannot: **seamless
micropayments and face-to-face transactions at scale**.

The importance of Atto’s approach becomes clear when considering the broader context. As our world becomes more
connected, the demand for fast and small payments is growing. Whether it's microtransactions in content and gaming,
small IoT payments machine-to-machine, or just paying someone back a few dollars, the future economy needs a **payment
layer that is fast, free, and open**. Atto is built to be that layer – a trust-minimized, decentralized network that
anyone can use without permission and without worrying about fees or delays. Moreover, it achieves this while being
environmentally responsible, proving that high throughput and low energy usage can go hand in
hand.

The project is still young, and there are challenges and milestones ahead. Key goals for the near future include
continuing to decentralize the network's governance (as more participants join and take on representative roles),
increasing the network’s resilience and capacity, and encouraging real adoption in everyday scenarios. The success of
Atto will ultimately depend on building a vibrant community of users and contributors who see value in a feeless,
instant currency and integrate it into various platforms and services. The incentives put in place – from the faucet to
contribution rewards – are meant to spark this growth, but the momentum will have to sustain itself through genuine
utility. Early signs, with an active community and successful technical rollout, are very promising.

It's also important to acknowledge the giants on whose shoulders Atto stands. Innovations by Satoshi Nakamoto gave us
decentralized digital money, and Colin LeMahieu’s Nano demonstrated that a feeless, efficient cryptocurrency is possible
at scale. Atto’s creator has explicitly credited those inspirations, and this project can be seen as a continuation of
that journey – refining, iterating, and focusing the technology to meet a specific need in the digital economy.

In conclusion, Atto offers a bold yet practical vision: **money that moves at the speed of light, with the weight of a
feather**. It brings the concept of
**“digital cash” to life in a way that is instantly usable and globally accessible.** By addressing the pain points of
fees, latency, and energy waste, Atto positions itself as an ideal medium of exchange for the modern age, from tiny IoT
payments to everyday human transactions. The network is live, the fundamentals are strong, and the path ahead is one of
community-driven growth. With Atto, we move closer to a world where value can flow as freely as information – empowering
new possibilities for commerce, innovation, and financial inclusion.

