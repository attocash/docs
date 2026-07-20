export const faq = [
  {
    question: "What is the minimum balance required for staking?",
    answer:
      "Under the current reward rules, you need to hold at least $10 USD worth of Atto in your wallet to be eligible for staking rewards."
  },
  {
    question: "How often are staking rewards paid out?",
    answer:
      "Under current operations, the reward system generally processes staking rewards once per day for eligible accounts using the previous day’s calculation. Processing time may vary."
  },
  {
    question: "Why do I need to make a transaction every 30 days?",
    answer:
      "The reward policy uses this activity requirement when determining eligibility. Making at least one transaction every 30 days keeps an otherwise qualifying account active for staking reward purposes."
  },
  {
    question: "What is the effective balance and how is it calculated?",
    answer:
      "Your effective balance is the average of your daily balances over the past 30 days, capped at your current balance. This limits the effect of briefly increasing a balance."
  },
  {
    question: "What is the voter cap and why does it exist?",
    answer:
      "The current reward calculation caps each voter’s effective delegated balance at 180 million Atto across all delegators. Above that cap, reward allocations are proportionally reduced for that voter’s eligible delegators. The cap is intended to encourage delegation across multiple voters."
  },
  {
    question: "How does the GSI affect my staking rewards?",
    answer:
      "Under the published Growth Stability Index (GSI) design, GSI can scale the base rate for a programme that uses it. Whether that design currently applies to staking, and with which settings and update cadence, must be confirmed from operational records. The displayed programme APY is an estimate before voter share, cap effects, and account eligibility, not a guaranteed user return."
  },
  {
    question: "Do unreceived funds count toward my staking balance?",
    answer:
      "No. Atto sent to your account must be received by logging into the wallet before it counts toward your staking balance."
  },
  {
    question: "How do I choose the best voter for staking?",
    answer:
      "Look for participating voters that display an APY percentage. A voter with lower total delegation may be less affected by the current 180 million Atto cap."
  },
  {
    question: "Can I change my voter after I start staking?",
    answer:
      "Yes, you can change your voter through your wallet. Select another participating voter that displays an APY percentage; future reward calculations use the new selection when your account is eligible."
  },
  {
    question: "What happens if my balance drops below the minimum?",
    answer:
      "An account below the current minimum of $10 USD worth of Atto is not eligible for staking rewards until its balance meets the minimum again."
  }
];
