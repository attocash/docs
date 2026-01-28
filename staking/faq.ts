export const faq = [
  {
    question: "What is the minimum balance required for staking?",
    answer:
      "You need to hold at least $10 USD worth of Atto in your wallet to be eligible for staking rewards."
  },
  {
    question: "How often are staking rewards paid out?",
    answer:
      "Staking rewards are paid out once per day. The system calculates rewards for the previous day and distributes them to all eligible accounts."
  },
  {
    question: "Why do I need to make a transaction every 30 days?",
    answer:
      "The activity requirement ensures that only active participants receive rewards. Making at least one transaction every 30 days confirms you're still engaged with the network and keeps your account eligible for staking."
  },
  {
    question: "What is the effective balance and how is it calculated?",
    answer:
      "Your effective balance is the average of your daily balances over the past 30 days, capped at your current balance. This averaging mechanism rewards consistent holders and prevents gaming the system by briefly inflating balances."
  },
  {
    question: "What is the voter cap and why does it exist?",
    answer:
      "Each voter has a maximum effective balance cap of 180 million Atto across all delegators. If a voter's total delegated balance exceeds this cap, rewards are proportionally reduced. This promotes decentralization by encouraging users to spread their delegation across multiple voters."
  },
  {
    question: "How does the GSI affect my staking rewards?",
    answer:
      "The Growth Stability Index (GSI) influences the effective APY. During favorable market conditions, the APY may be higher, while during bearish conditions, it adjusts downward to maintain price stability."
  },
  {
    question: "Do unreceived funds count toward my staking balance?",
    answer:
      "No. Any Atto sent to your account must be received by logging into the wallet before it counts toward your staking balance. Make sure to receive pending funds promptly to maximize your rewards."
  },
  {
    question: "How do I choose the best voter for staking?",
    answer:
      "Look for voters that display an APY percentage—these are active staking voters. Voters with lower total delegation may offer better reward rates due to the 180M cap."
  },
  {
    question: "Can I change my voter after I start staking?",
    answer:
      "Yes, you can change your voter at any time through your wallet. Simply select a different voter that shows an APY percentage. Your rewards will be calculated based on your new voter selection going forward."
  },
  {
    question: "What happens if my balance drops below the minimum?",
    answer:
      "If your balance falls below $10 USD worth of Atto, you will no longer be eligible for staking rewards until your balance meets the minimum requirement again."
  }
];
