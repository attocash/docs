---
title: Atto CLI Setup — Install, Receive and Send
sidebar_label: CLI
description: Create an Atto wallet in your terminal, inspect balances, receive payments, and send with durable request IDs.
sidebar_position: 2
---

# Set up the Atto CLI {#atto-cli}

Use Atto from your terminal or a script: inspect accounts, follow incoming payments, and send exact amounts. JSON output makes the same commands usable in your own tooling. The CLI is currently in beta for macOS, Linux, and Windows.

For capabilities and examples before installing, see the [Atto CLI overview](/build/cli).

## Install

Use Node.js 24.15.0 or newer; the latest 24.x release is recommended. Install the [published CLI package](https://www.npmjs.com/package/@attocash/cli):

```sh
npm install --global @attocash/cli
atto --help
```

Wallet secrets use macOS Keychain, Windows Credential Manager, or Linux Secret Service. Linux also needs `secret-tool`, an unlocked provider such as GNOME Keyring or KWallet, and access to the desktop D-Bus session. There is no plaintext-secret fallback when the password store is unavailable.

## Create a wallet and read its balance

Run this in your own interactive terminal:

```sh
atto wallet create
```

Setup stores the recovery phrase in the OS password store and displays it locally. Keep a private offline backup. To restore an existing wallet instead, use `atto wallet import` and enter the phrase in its hidden prompt, never as a command argument or in agent chat.

These commands inspect your wallet without sending or receiving funds:

```sh
atto wallet status
atto address list
atto balances
```

The default network is LIVE. Check the network and directory in `wallet status` before funding or using the wallet. `atto doctor` provides read-only environment diagnostics if setup or connectivity fails.

## Watch or receive incoming payments

To observe incoming payment events:

```sh
atto watch receivable
```

Watching does not credit pending payments to your account. To sign and publish the receive transactions, run:

```sh
atto wallet receive
```

Both commands keep running until you stop them with Ctrl+C. Receiving needs access to your wallet secret and the configured Node and Worker services.

## Send a payment deliberately

First inspect your allowance with `atto limits status`. To set example caps of 1 ATTO per payment and 5 ATTO across a rolling 24 hours, review and confirm this command in your terminal:

```sh
atto limits set --per-payment 1 --daily 5
```

This changes spending limits; it does not grant MCP spending access. Choose amounts appropriate to your use.

:::warning This sends real funds
The following command submits a payment from a funded wallet. Replace `RECIPIENT_ADDRESS` with the intended public address and check it before running the command. A spending cap is not a confirmation prompt for every payment.
:::

```sh
atto send RECIPIENT_ADDRESS 0.0001 --request-id first-payment-001
```

Amounts use exact decimal strings and default to ATTO. Keep the request ID. If the outcome is uncertain, inspect `atto journal show first-payment-001` and reuse the same ID for the same payment. A new ID creates a new payment attempt; running a send without an ID generates one automatically.

## Use the same wallet with an agent

The [MCP setup](/docs/integration/mcp) can select **Existing CLI wallet**. Keeping the same absolute `--data-dir` shares wallet state, request IDs, and spending limits. MCP otherwise uses a separate default wallet. Its read-only setting restricts MCP tools, not your CLI commands.

For scripts, start with a read-only structured result:

```sh
atto --json balances
```

## Next steps

- [Build with Atto](/docs/integration) to choose an integration.
- [MCP](/docs/integration/mcp) for assistants, or [N8N](/docs/integration/n8n) for workflows.
- [CLI source and command reference](https://github.com/attocash/integrations/tree/main/atto-cli) for account selection, retries, profiles, and recovery.
