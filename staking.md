---
sidebar_position: 5
---

# Staking

Staking allows Atto holders to earn rewards while helping decentralize the network. By delegating your balance to a voter, you contribute to network security and receive daily payouts based on the current APY.

## Eligibility Requirements

To be eligible for staking rewards, you must meet the following criteria:

1. **Minimum Balance**: Hold at least **$10 USD worth of Atto** in your wallet
2. **Voter Selection**: Delegate to a voter that displays an APY (these are active staking voters)
3. **Activity Requirement**: Make at least **one transaction every 30 days** to remain eligible
4. **Receive Pending Funds**: Any receivables (Atto sent to your account) must be received by logging into the wallet before they count toward your staking balance

## How Rewards Are Calculated

### Effective Balance

Your staking rewards are based on your **effective balance**, which is calculated as:

- The **average of your daily balances** over the past 30 days
- Capped at your **current balance** (you can't earn on funds you no longer hold)

This averaging mechanism rewards consistent holders and prevents gaming the system by briefly inflating balances.

### Daily Reward Formula

Each day, your reward is calculated using:

```
Daily Reward = Effective Balance × Daily APY Rate
```

Where the Daily APY Rate is derived from the current annual percentage yield:

```
Daily APY Rate = (1 + Annual APY)^(1/365) - 1
```

### Voter Cap

To promote decentralization, each voter has a **maximum effective balance cap of 180 million Atto** across all delegators. If a voter's total delegated balance exceeds this cap, rewards are proportionally reduced for all delegators to that voter.

This encourages users to spread their delegation across multiple voters rather than concentrating on a single one.

### GSI Influence

The effective APY is influenced by the [Growth Stability Index (GSI)](/docs/growth-stability-index). During favorable market conditions, the APY may be higher, while during bearish conditions, it adjusts downward to maintain price stability.

## Payout Schedule

Staking rewards are **paid out once per day**. The system calculates rewards for the previous day and distributes them to all eligible accounts.

## How to Start Staking

1. **Get Atto**: Ensure you have at least $10 USD worth of Atto in your wallet
2. **Choose a Voter**: In your wallet, select a voter that shows an APY percentage
3. **Stay Active**: Make at least one transaction every 30 days to maintain eligibility
4. **Receive Funds**: Log into your wallet regularly to receive any pending transactions

## Tips for Maximizing Rewards

- **Maintain consistent balances**: Since rewards are based on your 30-day average, keeping a stable balance maximizes your effective balance
- **Choose voters wisely**: Voters with lower total delegation may offer better reward rates due to the 180M cap
- **Stay active**: A single small transaction every 30 days keeps you eligible
- **Receive pending funds promptly**: Unreceived funds don't count toward your staking balance

## Why Stake?

Staking serves multiple purposes in the Atto ecosystem:

- **Earn passive rewards**: Generate returns on your Atto holdings
- **Support decentralization**: By choosing diverse voters, you help distribute network power
- **Strengthen the network**: Active stakers contribute to network security and consensus

For more information on how distribution rates are adjusted based on market conditions, see the [Growth Stability Index](/docs/growth-stability-index) documentation.
