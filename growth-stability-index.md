---
sidebar_position: 4
---

# Growth Stability Index

The Growth Stability Index (GSI) is a metric that dynamically adjusts Atto's distribution rate based on market conditions. It helps balance the need for widespread token distribution with price stability, ensuring that Atto remains practical as digital cash.

## How It Works

The GSI is a value between a configured minimum (typically 0.10) and 1.0 that represents the current market position relative to recent price history. It is calculated using three key price metrics:

- **7-Day Average Price**: A smoothed price that reduces noise from short-term fluctuations
- **All-Time High (ATH)**: The highest price Atto has ever reached
- **1-Month Low**: The lowest price in the past 30 days

### The Formula

The target GSI is calculated as:

```
GSI = (7-Day Average Price - 1-Month Low) / (ATH - 1-Month Low)
```

This formula positions the current price on a scale from 0 to 1:
- **GSI near 0**: Price is close to the 1-month low (bearish conditions)
- **GSI near 1**: Price is close to the all-time high (bullish conditions)

## Asymmetric Adjustment

A key feature of the GSI is its **asymmetric adjustment mechanism**:

- **Downward adjustments are instant**: When market conditions worsen, the GSI drops immediately to the target value
- **Upward adjustments are capped**: When conditions improve, the GSI can only increase by a maximum of 0.01 per update cycle

This asymmetry serves an important purpose: it allows the system to **quickly reduce distribution** when prices fall (protecting against selling pressure), while **gradually increasing distribution** when prices rise (preventing overheating during rallies).

### Example

Consider a scenario where:
- Current GSI: 0.50
- Market rallies, target GSI becomes: 0.80

Instead of jumping to 0.80, the GSI will increase gradually:
- Update 1: 0.50 → 0.51
- Update 2: 0.51 → 0.52
- ... and so on

However, if the market then crashes and the target GSI drops to 0.30:
- The GSI immediately adjusts: 0.52 → 0.30

## Impact on Distribution

The GSI directly influences the rate at which new Atto enters circulation through mining, staking rewards, and other regular distribution programs. When the GSI is:

- **High (closer to 1.0)**: Distribution rates can be higher, as market conditions support additional supply
- **Low (closer to minimum)**: Distribution rates are reduced to minimize selling pressure during weak market conditions

This creates a self-regulating system where:
1. Strong markets allow for faster distribution, accelerating adoption
2. Weak markets trigger reduced distribution, supporting price stability
3. The asymmetric adjustment prevents rapid oscillation between states

## Why GSI Matters

The GSI embodies Atto's commitment to being **usable money**, not just a speculative asset. By dynamically adjusting distribution based on market conditions:

- **Users gain confidence**: Knowing that distribution responds to market conditions reduces fear of sudden supply floods
- **Volatility is dampened**: The asymmetric mechanism naturally smooths out boom-bust cycles
- **Long-term adoption is prioritized**: Gradual, stable growth is favored over short-term hype

For more details on Atto's distribution strategy, see the [Distribution](/docs/distribution) page and the blog post on [A New Distribution Strategy](/blog/new-distribution-strategy).
