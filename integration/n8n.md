---
title: Atto N8N Setup — Install Nodes and Receive Payment Events
sidebar_label: N8N
description: Add Atto payments and live account events to N8N workflows. Start with a public account lookup that needs no wallet secret.
sidebar_position: 3
---

# Set up Atto in N8N {#atto-for-n8n}

Connect payments to a workflow: read an account, start a process when a payment arrives, or send funds as a workflow step. The package provides an **Atto** action node and an **Atto Trigger** node for live network events.

For capabilities and workflow examples, see [Atto payment workflows for N8N](/build/n8n).

## Install on self-hosted N8N

Use an N8N installation that permits community nodes. Its runtime must meet both N8N's requirements and this package's minimum of Node.js 22.22.0. See the [package](https://www.npmjs.com/package/@attocash/n8n-nodes-atto) and [installation reference](https://github.com/attocash/integrations-n8n#installation).

1. Open **Settings > Community Nodes** and select **Install**.
2. Enter `@attocash/n8n-nodes-atto`.
3. Review and accept the community-node warning, then install.

Restart N8N if the nodes do not appear in the picker.

## Read an account without a wallet secret

1. Create an **Atto API** credential. For the public LIVE service, use `https://gatekeeper.live.application.atto.cash` as **Node Base URL**. Leave **Wallet Secret** and **API Key** blank.
2. Add a **Manual Trigger**, then connect an **Atto** node and select that credential.
3. Select resource **Account**, operation **Get**, and enter a public Atto address in **Address**. Use your wallet's public address or one from the [explorer](/explorer).
4. Execute the node to read the account's balance, representative, height, and frontier. An account that is not open returns `found: false`.

This operation does not sign or publish anything. The credential test checks the Node endpoint only; it does not validate signing material or the Worker service.

## Start a workflow from an incoming payment

Add **Atto Trigger** and select event **Receivable**. Choose **Manual Addresses** for **Address Source**, then enter the public address in **Addresses**. This configuration can use the same credential with no wallet secret.

Run the trigger in test mode or activate the workflow to listen for live receivable events. The trigger uses the Node's streaming endpoints and reconnects when a stream closes. You can import the [receivable-trigger example](https://github.com/attocash/integrations-n8n/blob/main/examples/receivable-trigger.json); select your own credential and switch its **Address Source** to **Manual Addresses** to use it without a wallet secret.

A receivable is an incoming payment waiting to be received by its destination account. The trigger only reports it. To receive funds, connect an **Atto** node using **Receivable > Receive**, with signing credentials for that destination. This step publishes a receive transaction, or opens the account for its first payment. See the [incoming-to-receive example](https://github.com/attocash/integrations-n8n/blob/main/examples/incoming-to-receive.json).

## Enable signing only where it is needed

Sending, receiving, and changing representatives need:

- **Worker Base URL**, alongside the Node URL. The public LIVE default for both is `https://gatekeeper.live.application.atto.cash`.
- **Wallet Secret Type** and **Wallet Secret** in an Atto API credential: a 24-word Atto mnemonic or a compatible private key.
- The correct **Key Index** for mnemonic-derived accounts; it defaults to `0`.

To send, choose **Transaction > Send** and set **Destination Address**, **Amount**, and **Amount Unit**. Executing this operation signs and publishes a real payment.

:::warning Workflow credentials grant signing access
N8N does not use the CLI/MCP profile or inherit its spending caps and terminal approvals. A workflow with signing credentials can submit transactions when it runs. Use a dedicated wallet, restrict credential and workflow access, and design any approval and spending checks in the workflow itself.
:::

Keep wallet secrets in N8N's encrypted credentials, not chat, exported workflow JSON, or ordinary node parameters. Review execution-data retention before using real funds. The [security and operation reference](https://github.com/attocash/integrations-n8n/blob/main/USAGE.md) covers credential use and node behavior.

## Next steps

- [Build with Atto](/docs/integration) to compare integration options.
- [MCP](/docs/integration/mcp) for agent access, or [CLI](/docs/integration/cli) for terminal payments.
- [N8N source and examples](https://github.com/attocash/integrations-n8n) for the full operation list and importable workflows.
