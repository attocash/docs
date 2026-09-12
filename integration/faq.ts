export const faq = [
  {
    question: "Is Atto a standalone blockchain or a token on another chain?",
    answer:
      "Atto is its own layer-1 blockchain network. It is not an ERC-20 or token on another chain. To integrate, you need to run Atto’s node software or use its APIs."
  },
  {
    question: "How many decimal places does Atto use?",
    answer:
      "Atto supports 9 decimal places. One ATTO = 1,000,000,000 raw units. Integrators should store balances as unsigned long in raw units to avoid floating point rounding errors."
  },
  {
    question: "Are transactions on Atto feeless?",
    answer:
      "Yes. Atto charges no transaction fee, so the amount you send is exactly what the recipient receives. Exchanges or other services may charge their own fees, and running your integration still has infrastructure costs."
  },
  {
    question: "Does Atto use Proof-of-Work?",
    answer:
      "Atto requires a very small Proof-of-Work for each transaction to prevent spam. This work is trivial compared to traditional mining and can usually be computed quickly on modern hardware. Consensus itself is achieved through Open Representative Voting (ORV), not PoW."
  },
  {
    question: "What is the block time on Atto?",
    answer:
      "Atto does not use traditional blocks. Each account maintains its own chain of transactions, and transactions are processed as they are received. That is why ",
    link: {
      href: "/metrics#confirmation-speed",
      label: "confirmation can feel near-instant",
      suffix: " instead of waiting for a block interval."
    }
  },
  {
    question: "How fast are transactions confirmed?",
    answer:
      "In normal conditions, Atto is built for ",
    link: {
      href: "/metrics#confirmation-speed",
      label: "sub-second confirmation",
      suffix: ". The metrics page shows median/P50, average, P95 and P99 so you can see both typical and slower confirmations. Actual timing depends on network conditions."
    }
  },
  {
    question: "How many confirmations are required for deposits?",
    answer:
      "One confirmed account update is enough; you do not need to wait for additional global blocks. Before crediting a deposit, check the node’s confirmed transaction, destination and amount. The receiving wallet must also publish a Receive or Open transaction to add the funds to its spendable balance."
  },
  {
    question: "Why does a transfer not show up?",
    answer:
      "Incoming transactions are first created as receivables. For the funds to become spendable, the receiver must generate a receive block to add them to their account balance."
  },
  {
    question: "Do Atto addresses require memos or destination tags?",
    answer:
      "No. Atto does not use memos or destination tags. Each account has its own unique address, and there is no cost to create new accounts. This means exchanges can safely generate a dedicated deposit address per user without worrying about reserve requirements or additional bookkeeping."
  },
  {
    question: "What is the recommended way to generate Proof-of-Work for transactions?",
    answer:
      "Use the Atto Work Server. It is designed to quickly compute the lightweight Proof-of-Work required for transactions, offloading the task from your main wallet or exchange backend."
  },
  {
    question: "How are double-spends or forks prevented?",
    answer:
      "Each account has one confirmed chain of transactions. Its owner signs each update, which links back to the previous block. If conflicting updates are proposed, representatives vote to select one; nodes reject updates that conflict with the confirmed chain."
  },
  {
    question: "What is the minimum deposit or withdrawal amount?",
    answer:
      "You can send as little as 0.000000001 ATTO, one raw unit, without a network fee eating into the payment. Exchanges and applications may set higher deposit or withdrawal minimums."
  },
  {
    question: "Does Atto support smart contracts?",
    answer:
      "No. Atto is intentionally focused purely on payments. There is no EVM, smart contract engine, or generalized execution environment. This design choice is deliberate: by focusing only on the most basic use case, Atto avoids added complexity, attack surface, latency, and resource usage. Instead, it aims to do one thing exceptionally well — provide instant, feeless, and final digital cash transactions. Integration is therefore limited to addresses, transactions, and balances, keeping the protocol lean and optimized for payments."
  },
  {
    question: "What is the address format?",
    answer:
      "Atto addresses are base32 strings starting with 'atto://'. They include a checksum for typo detection. Always validate addresses before accepting processing withdrawals."
  },
  {
    question: "Can Atto transactions fail?",
    answer:
      "Yes. An invalid transaction is rejected, and a submitted transaction can be dropped or remain unconfirmed. A timeout does not necessarily mean failure: the payment may already have confirmed. Check its saved hash and account history before creating another payment. See ",
    link: {
      href: "/docs/whitepaper/technical#failure-modes-and-their-boundaries",
      label: "confirmation and failure boundaries",
      suffix: "."
    }
  },
  {
    question: "Does Atto support reorgs or chain rollbacks?",
    answer:
      "Atto does not use longest-chain reorganizations or require you to wait for later blocks to make a payment final. Representatives confirm each account update through voting. The technical whitepaper explains the network assumptions behind that finality and what happens when they are not met. See ",
    link: {
      href: "/docs/whitepaper/technical#failure-modes-and-their-boundaries",
      label: "confirmation and failure boundaries",
      suffix: "."
    }
  },
  {
    question: "How do I query balances and transactions?",
    answer:
      "Balances, pending receivables, and transaction history can be retrieved through the node RPC APIs."
  },
  {
    question: "Can I use the same infrastructure for multiple services?",
    answer:
      "Yes. A single node can serve several applications or exchanges; give it enough resources, appropriate access controls and redundancy for uptime. Behind a load balancer, nodes can briefly observe different account states. Sticky sessions keep a client on the same node, but do not replace transaction-hash checks and recovery after an uncertain response."
  },
  {
    question: "What happens if a user sends funds to the wrong address?",
    answer:
      "You cannot cancel a confirmed Send. If you sent funds to the wrong person, you need their cooperation to receive the payment and send it back. If no one controls the destination’s key, the funds cannot be recovered."
  },
  {
    question: "What monitoring is recommended?",
    answer:
      "Atto nodes expose detailed Prometheus metrics out of the box, which is the industry standard for application monitoring. These metrics can be scraped directly and exported to commercial tools such as Grafana, Datadog, or any compatible monitoring system. The most common metrics of interest for node operators are confirmation time, account height, and unchecked transactions. For confirmation time, track median/P50 for the typical transaction, P95/P99 for slower confirmations, and average for the arithmetic mean."
  },
  {
    question: "Is there a testnet?",
    answer:
      "Yes. You can run a local development network for controlled tests; the protocol supports LIVE, BETA, DEV and LOCAL networks. Check endpoint availability before using a shared test network. You can also try tiny payments on LIVE to test deposits and withdrawals without transaction fees. Those payments still move real ATTO, so use a test wallet and small amounts."
  },
  {
    question: "Is Atto MiCA compliant?",
    answer:
      "Read the ",
    link: {
      href: "/docs/whitepaper",
      label: "MiCA Crypto-Asset Whitepaper",
      suffix: " for the crypto-asset disclosure, including classification, rights, trading and risks. Publication does not mean approval by an EU competent authority."
    }
  }
];
