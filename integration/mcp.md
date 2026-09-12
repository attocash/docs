---
title: Atto MCP
sidebar_label: MCP
description: Connect an AI assistant to Atto. Start read-only, then approve bounded spending in your own terminal.
sidebar_position: 1
---

# Atto MCP

Give an MCP-compatible assistant access to balances, payment history, and live events. When you want it to pay for a service or complete a purchase, you can approve a spending allowance without putting a recovery phrase in the conversation.

## Before you begin

You need Node.js 24.15.0 or newer, an MCP client that supports local stdio servers, and an accessible OS password store. The current package is in beta; use the latest Node.js 24.x release. See the [package requirements](https://www.npmjs.com/package/@attocash/mcp).

macOS uses Keychain and Windows uses Credential Manager. On Linux, install `secret-tool` and use an unlocked Secret Service provider, such as GNOME Keyring or KWallet, in your desktop D-Bus session. Start the MCP client as the same OS user with access to that session.

## Connect with read-only access

Run setup in your own interactive terminal:

```sh
npx --yes @attocash/mcp@latest setup
```

1. Choose **Dedicated MCP wallet (default)** for a separate agent wallet.
2. Create or import the wallet in the terminal and choose **read-only** access.
3. Save any recovery phrase privately, offline. Never paste it into an agent conversation or client configuration.
4. Add the server to your client's MCP settings using the `mcpServers` configuration printed by setup. If your client uses a different configuration format, keep the same `command` and `args`, including `--data-dir` and its absolute path.
5. Restart or reconnect the client. It starts the server; the setup terminal does not need to stay open.

The `--yes` option accepts npm's package-install prompt only. It does not approve wallet creation or spending.

For a first read-only action, ask:

> Show my wallet status, balances, and current access and spending limits. Do not change anything.

The corresponding tools are `wallet_status`, `balances_get`, and `limits_get`. If something cannot connect, ask for the `doctor` report.

## Share a CLI wallet

Setup also offers **Existing CLI wallet**. Both interfaces must select the same absolute directory to share funds, payment request IDs, history, and spending limits. Check the CLI's directory with `atto wallet status`, then preserve the directory in the generated MCP configuration.

Omitting `--data-dir` selects the dedicated MCP wallet, not the CLI's default wallet. [Set up the CLI](/docs/integration/cli) if you also want direct terminal access.

## Approve a spending allowance

Read-only access supports queries, personal labels, watches, and limit proposals. It cannot send or receive funds, change representatives, or configure the wallet. Watching an incoming payment does not receive it.

When you are ready to allow payments:

1. Ask the assistant to propose a per-payment cap, a rolling spending cap, and the permitted source accounts using `limits_propose`.
2. Review the proposed changes. A proposal alone grants nothing.
3. Run one of the returned `approval.commands` yourself in a local terminal, preserving its profile path, proposal ID, and shell quoting.
4. Check the wallet, network, access, amount limits, account indexes, and consolidation setting before confirming.

There is no MCP tool that approves its own proposal. Approved sending limits apply across CLI and MCP payments in the same profile. Receiving and representative changes require MCP spending access but do not consume the sending allowance. See the [approval reference](https://github.com/attocash/integrations/tree/main/atto-mcp#approve-access-and-limit-changes) for the full policy and approval flow.

:::warning Keep the boundary clear
MCP limits constrain these wallet tools, not arbitrary programs running as your OS user. Unrestricted shell access is a separate permission. Keep recovery material out of chat and use a dedicated wallet when you want separate funds.
:::

## Next steps

- [Build with Atto](/docs/integration) to compare integration options.
- [CLI](/docs/integration/cli) for terminal payments, or [N8N](/docs/integration/n8n) for workflows.
- [MCP source and tool reference](https://github.com/attocash/integrations/tree/main/atto-mcp) for configuration, watches, and troubleshooting.
