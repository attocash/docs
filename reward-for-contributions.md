---
sidebar_position: 4
title: Contribution Rewards Policy
---

# Contribution Rewards Policy

Atto may reward useful work that improves the public ecosystem. For normal contributions, the path is a pull request: open a PR, work through review, receive a reward-tier label when the work is accepted for reward, and get it merged.

Bug reports, feature requests, issue comments, Discord messages, and suggestions are appreciated, but they do not qualify for rewards by themselves. If a bug report turns into an accepted fix PR, the PR may qualify.

:::info
This page is the policy reference. If you want the shorter overview, start with the [contribution rewards page](/contributions).
:::

## What Qualifies

Contribution rewards are normally considered during review for PRs that make Atto better:

- Code changes and feature work
- Bug fixes submitted as pull requests
- Tests, tooling, CI, examples, and developer-experience improvements
- Documentation, tutorials, and integration guides
- Wallet, UI, or UX improvements
- Useful ecosystem work connected to Atto repositories

Opening a PR does not guarantee a merge or a reward. Maintainers may decide that a contribution is not a good fit, needs a different approach, or is outside the current project priorities. If the PR is accepted for reward, maintainers assign the reward tier before merge by adding the matching tier label.

For larger work, it is usually better to check in first through an issue, discussion, or draft PR. That avoids spending a lot of time on a direction the project may not accept.

## What Does Not Qualify

These do not qualify by themselves:

- Ordinary bug reports
- Feature requests or product suggestions
- Issue comments, Discord messages, or informal feedback
- Duplicate work
- Abandoned or unmerged PRs
- Generated, low-effort, or noisy changes
- Public disclosure of security vulnerabilities before private review

## Security Exception

Critical vulnerabilities are the only report-only exception. Do not open a public pull request or public issue for security vulnerabilities.

To qualify for the critical vulnerability tier, report the issue privately through [GitHub Security Advisories](https://github.com/attocash/node/security), wait for the team to acknowledge it, and do not share details publicly until the issue is addressed.

## Reward Tiers

| Tier | Reward | Typical Work |
| --- | ---: | --- |
| Critical vulnerability | 1,500,000 ATTO | Private report of an urgent security issue that could threaten users, funds, or core network safety. |
| Epic PR | 1,500,000 ATTO | Large accepted project with broad impact across one or more repositories. |
| Major PR | 400,000 ATTO | Meaningful accepted feature, integration, refactor, documentation project, or fix. |
| Minor PR | 100,000 ATTO | Smaller accepted improvement, bug fix, documentation update, test, or tool change. |
| Tweak PR | 20,000 ATTO | Small accepted cleanup, copy fix, UI polish, optimization, or maintenance change. |

## How Rewards Are Assigned

Maintainers review the PR before it is merged. If the contribution qualifies, they add a tier label to the PR before merge. That label is the reward decision.

After the labeled PR is merged, the ATTO reward is sent automatically.

The tier can depend on impact, difficulty, completeness, review effort, and how useful the change is to the project.

Reward amounts are guidelines and may change over time. If reward amounts change, maintainers will consider the date when the tier label was assigned or the private security report was acknowledged.

## How To Contribute

1. Pick work that improves Atto for users, developers, or operators.
2. For larger work, check in first with an issue, discussion, or draft PR.
3. Open a pull request in the relevant [Atto repository](https://github.com/attocash).
4. Explain what changed and why it matters.
5. Respond to maintainer review.
6. If the PR qualifies, maintainers add the reward-tier label before merge.
7. After the labeled PR is merged, the reward is sent automatically.

For security vulnerabilities, skip the public PR and use the private security flow instead.
