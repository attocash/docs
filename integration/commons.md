---
sidebar_position: 4
title: Atto Commons Getting Started — Packages and Exact Amounts
sidebar_label: Commons
description: Build Atto applications with modular libraries for exact amounts, addresses, node clients, wallets, signing, and proof-of-work.
---

# Get started with Atto Commons {#atto-commons}

Use Commons when you want Atto inside your own application. It provides the protocol types and client libraries behind addresses, transactions, network monitoring, and wallet operations. You choose the modules your application needs.

Commons is available for TypeScript and JavaScript through npm, and for Java and Kotlin on the JVM. See [Commons capabilities and supported languages](/build/commons) to find the right starting point for your application.

For a ready-made agent connection, terminal interface, or workflow node, start with [MCP](/docs/integration/mcp), [CLI](/docs/integration/cli), or [N8N](/docs/integration/n8n) instead.

## Start with exact amounts

This first example runs locally. It does not create keys, connect to a node, or move funds.

Use Node.js 24 or newer for this example. Install Core in your JavaScript project:

```bash
npm install @attocash/commons-core@8.0.0
```

Save this as `amount.mjs`, then run `node amount.mjs`:

```javascript
import {AttoAmount, AttoUnit} from '@attocash/commons-core';

const amount = AttoAmount.from(AttoUnit.ATTO, '0.0001');

console.log(amount.toString());                  // 100000 raw units
console.log(amount.toFormattedString(AttoUnit.ATTO)); // 0.0001 ATTO
```

The amount enters as a decimal string, not a JavaScript floating-point number. One ATTO is 1,000,000,000 raw units. Use Commons value types, decimal strings, or `bigint` when handling amounts and other large protocol integers.

You can also explore these conversions in [Encoding & Values](/docs/tools/encoding-values).

## Choose your modules

The packages are split by responsibility. Start with the smallest set that supports your application; a read-only integration does not need a wallet or signer.

| Need | Module |
| --- | --- |
| Amounts, keys, addresses, blocks, serialization, validation | [commons-core](https://github.com/attocash/commons/tree/main/commons-core) |
| Node operations and account/transaction monitors | [commons-node](https://github.com/attocash/commons/tree/main/commons-node) |
| HTTP node client and network streams | [commons-node-remote](https://github.com/attocash/commons/tree/main/commons-node-remote) |
| Wallet operations and automatic receiving | [commons-wallet](https://github.com/attocash/commons/tree/main/commons-wallet) |
| External signing | [commons-signer-remote](https://github.com/attocash/commons/tree/main/commons-signer-remote) |
| CPU proof-of-work | [commons-worker](https://github.com/attocash/commons/tree/main/commons-worker) |
| Browser WebGPU/WebGL proof-of-work | [commons-worker-web](https://github.com/attocash/commons/tree/main/commons-worker-web) |
| JVM OpenCL proof-of-work | [commons-worker-opencl](https://github.com/attocash/commons/tree/main/commons-worker-opencl) |
| Remote proof-of-work service | [commons-worker-remote](https://github.com/attocash/commons/tree/main/commons-worker-remote) |
| Shared HTTP transport | [commons-transport](https://github.com/attocash/commons/tree/main/commons-transport) |
| Spring Boot integration | [commons-spring-boot-starter](https://github.com/attocash/commons/tree/main/commons-spring-boot-starter) |
| Mock services and test utilities | [commons-test](https://github.com/attocash/commons/tree/main/commons-test) |

Working in Java? The maintained [Java client example](https://github.com/attocash/commons/tree/main/examples/java-client) walks through a wallet flow against local mock services, with its own setup instructions.

Kotlin/JVM, JavaScript, and Wasm support varies by module. Check the module README for its supported targets. JavaScript packages use the `@attocash/` scope; Gradle dependencies use the `cash.atto` group. Prefer the individual packages over the deprecated `@attocash/commons-js` aggregate.

## Connect an application

For JavaScript node access, install Core, the node interfaces, and the remote client at matching versions:

```bash
npm install @attocash/commons-core@8.0.0 \
  @attocash/commons-node@8.0.0 \
  @attocash/commons-node-remote@8.0.0
```

Use the [remote-client guide](https://github.com/attocash/commons/tree/main/commons-node-remote) for connection setup and the [Node API](/api/node) for endpoint contracts. The [maintained JavaScript example](https://github.com/attocash/commons/tree/main/examples/js-client) shows a fuller wallet flow against mock services; it requires Node.js 24 or newer and a container runtime. Treat its generated keys as disposable demo material, not production wallet credentials.

Keep reads separate from writes. An account query needs a public address; publishing a transaction also needs a valid signed block and proof-of-work. Wallet and worker modules support that workflow, but your application still owns authorization, key storage, and payment limits.

## Keep the protocol boundary intact

- Feed raw JSON strings to the relevant Commons `fromJson` method. Parsing large unquoted integers through `JSON.parse()` or `response.json()` can round them before Commons sees them.
- Parsing a transaction is not cryptographic verification. Use its `validate()` or `isValid()` method when verification is required.
- Cryptographic operations may return promises in JavaScript. Follow the generated declarations for your installed release rather than copying older synchronous examples.
- Cancel subscriptions when their owner stops, and close clients when finished. Monitor consumers should persist and acknowledge progress deliberately.
- Keep private keys out of logs, browser persistence, and agent prompts. Adding Commons does not provide the CLI/MCP approval policy automatically.

## Continue building

- [Commons source and module documentation](https://github.com/attocash/commons)
- [Published Core package](https://www.npmjs.com/package/@attocash/commons-core)
- [Advanced Commons integration](/docs/integration/advanced/offline-signing-with-atto-commons) — lower-level concepts and version-pinned examples.
- [Browser tools](/docs/tools) — inspect encodings, addresses, blocks, and network data.
- [All integration paths](/docs/integration)

The local amount example above was checked with Commons Core 8.0.0. Keep related modules on matching releases and consult the [release notes](https://github.com/attocash/commons/releases) before upgrading across major versions.
