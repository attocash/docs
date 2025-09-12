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
    question: "Are transactions on Atto free?",
    answer:
      "Yes. Atto is a feeless blockchain. The amount a user sends is exactly what the recipient receives."
  },
  {
    question: "Does Atto use Proof-of-Work?",
    answer:
      "Atto requires a very small Proof-of-Work for each transaction to prevent spam. This work is trivial compared to traditional mining and can be computed in milliseconds on modern hardware. Consensus itself is achieved through Open Representative Voting (ORV), not PoW."
  },
  {
    question: "What is the block time on Atto?",
    answer:
      "Atto does not use traditional blocks. Each account maintains its own chain of transactions. Transactions are processed as they are received, with confirmation typically under 1 second."
  },
  {
    question: "How fast are transactions confirmed?",
    answer:
      "In normal conditions, transactions are confirmed in 300–600 ms. Once confirmed, they are final and irreversible."
  },
  {
    question: "How many confirmations are required for deposits?",
    answer:
      "One confirmation is sufficient. Atto has no reorgs, so once a transaction is confirmed by representatives it is final."
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
      "Each account can only have one valid chain of transactions. Representatives vote on the correct transaction when published. Finality is achieved within a second and forks are effectively resolved immediately."
  },
  {
    question: "What is the minimum deposit or withdrawal amount?",
    answer:
      "Atto has no protocol-level minimum. However, exchanges may choose to enforce their own minimums to avoid dust deposits."
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
      "If the transaction is invalid, it will be rejected. Otherwise, once broadcast and confirmed, transactions cannot fail anymore or be reversed."
  },
  {
    question: "Does Atto support reorgs or chain rollbacks?",
    answer:
      "No. Atto achieves immediate finality via representative voting. There are no reorgs and no need to wait multiple blocks."
  },
  {
    question: "How do I query balances and transactions?",
    answer:
      "Balances, pending receivables, and transaction history can be retrieved through the node RPC APIs."
  },
  {
    question: "Can I use the same infrastructure for multiple services?",
    answer:
      "Yes. A single Atto node can serve multiple integrations, exchanges, or services. Just ensure adequate resources and redundancy for uptime. If you run more than one node behind a load balancer, make sure to use sticky sessions. Because Atto nodes do not maintain a global synchronized state, different nodes may observe confirmations at slightly different speeds. By sticking a client session to the same node, you guarantee consistent responses."
  },
  {
    question: "What happens if a user sends funds to the wrong address?",
    answer:
      "Transactions on Atto are irreversible. If funds are sent to an incorrect or non-controlled address, they cannot be recovered without cooperation from the recipient."
  },
  {
    question: "What monitoring is recommended?",
    answer:
      "Atto nodes expose detailed Prometheus metrics out of the box, which is the industry standard for application monitoring. These metrics can be scraped directly and exported to commercial tools such as Grafana, Datadog, or any compatible monitoring system. The most common metrics of interest for node operators are confirmation speeds (how fast transactions are finalized), account height, and unchecked transactions."
  },
  {
    question: "Is there a testnet?",
    answer:
      "Yes. A development network can be spun up on demand for controlled testing. However, because Atto is completely feeless and supports micro amounts, most testing can be done directly on the live network at no cost. This makes it easy to validate deposits, withdrawals, and API interactions without worrying about fees."
  },
  {
    question: "Is Atto MiCA compliant?",
    answer:
      "Atto falls under the 'other crypto-asset' category in MiCA. While Atto B.V. develops and maintains the software, there was no ICO or fundraising event, and tokens are distributed through community and reward mechanisms. This makes Atto suitable for listing under EU compliance frameworks, provided standard exchange due diligence is met."
  }
];
