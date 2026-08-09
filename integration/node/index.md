---
sidebar_position: 0
sidebar_label: Overview
---

# Node

A node gives applications access to the network, allowing them to view the ledger and submit transactions. Some nodes
also participate in consensus, while others are primarily responsible for maintaining a full copy of the ledger
containing all transactions from the network's inception.

## Quick Reference

### Ports

| Port     | Purpose                                                 | Exposure                                                     |
|----------|---------------------------------------------------------|--------------------------------------------------------------|
| **8080** | REST APIs. Refer to the [OpenAPI definition](/api/node) | Cluster‑internal on historical nodes, private on voters.     |
| **8081** | Liveness `/health` & metrics `/prometheus`              | Cluster‑internal only.                                       |
| **8082** | Node‑to‑node gossip (WebSocket)                         | Terminate TLS at the load‑balancer / ingress. Public‑facing. |

### Required Environment Variables

| Variable           | Purpose                                    | Example                       |
|--------------------|--------------------------------------------|-------------------------------|
| `ATTO_PUBLIC_URI`  | External WebSocket URI advertised to peers | `wss://replace-with-your-public-hostname.invalid:8082` |
| `ATTO_DB_HOST`     | MySQL hostname or service                  | `node-mysql`                  |
| `ATTO_DB_NAME`     | Database name                              | `node`                        |
| `ATTO_DB_USER`     | DB user with read/write perms              | `node`                        |
| `ATTO_DB_PASSWORD` | User password                              | A randomly generated secret   |


The `.invalid` hostname must be replaced with the actual public IP address or domain, which can be found at
[whatismyip.com](https://www.whatismyip.com). The placeholder cannot resolve publicly.

If the administrator chooses not to set up TLS termination for port 8082, `wss://` should be replaced with `ws://`.

The `live` image already selects its runtime profile. Do not set `SPRING_PROFILES_ACTIVE` when using that tag.

:::tip
When bootstrapping a new node, it is recommended to vertically scale your MySQL database (e.g., by providing more
CPU/RAM) until the node fully catches up with the network. A node is in sync when fresh samples of its account height
match the height in the [public metrics projection](https://gatekeeper.live.application.atto.cash/projections/metrics)
and its database contains no unchecked transactions. Check twice rather than relying on one sample.
:::

## Minimum Requirements

The minimum requirements for running a node are:

- A stable internet connection
- 1 modern CPU core
- 1 GB of RAM for the node service
- 2 GB of total host RAM when MySQL runs on the same machine
- SSD or NVMe storage with enough free space for the growing ledger

The Compose examples limit the node to 1 GB but do not hard-cap MySQL, because a 512 MB database limit can cause a fresh
bootstrap to fail. If MySQL runs on another machine, the node host still needs 1 GB and the database host must be sized
separately. An all-in-one host with an already-bootstrapped database may sometimes operate with 1 GB, but this is below
the recommended configuration and should not be used for a fresh setup. Do not count swap as RAM.

## Choose a Node Role

There are two node roles. Choose the role before initializing the database: changing roles later requires deleting the
database and completing a fresh bootstrap.

### Historical Node {#historical-node}

A historical node maintains and publishes the full ledger. It provides REST access for applications and does not sign
consensus votes. It does not require role-specific environment variables beyond the shared node configuration.

### Voter Node {#voter-node}

<a id="voter-with-a-direct-private-key"></a>

A voter node maintains the ledger and participates in consensus by signing votes. It can use a direct private key or an
external signer.

For a direct-key voter, use the [Docker example](/docs/integration/node/docker#voter-with-a-direct-private-key) or the
[Kubernetes example](/docs/integration/node/kubernetes#voter-with-a-direct-private-key).

<a id="voter-with-a-gcp-kms-signer"></a>

## Voter Signing Configuration

A voter node requires a mechanism to sign votes and other network messages. There are two primary ways to configure
this:

1. **Direct Private Key:** You can provide an Ed25519 private key directly to the node via the `ATTO_PRIVATE_KEY`
   environment variable.
2. **External Signer (Recommended):** For enhanced security and key management, it's recommended to use an external
   signer service.

* The Atto node can integrate with a dedicated signer application. Currently, GCP Cloud Key Management Service (KMS) is
  supported as a backend for this signer application.
* If you use an external signer, the `ATTO_PRIVATE_KEY` environment variable is not required, as all signing operations
  are delegated.
* Setting up the signer application itself involves its own configuration, please refer to [
  `signer`](/docs/integration/signer) doc.
* If you'd like to see support for other KMS vendors or signing solutions, please open an issue on
  the [attocash/signer GitHub repository](https://github.com/attocash/signer).

### Voting Node Quick Reference

#### For Direct Private Key:

| Variable           | Purpose                                       | Example                                                            |
|--------------------|-----------------------------------------------|--------------------------------------------------------------------|
| `ATTO_PRIVATE_KEY` | Ed25519 private key in hex format (64 chars). | `0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef` |


The section [Key Generation and
Derivation](/docs/integration/advanced/offline-signing-with-atto-commons#key-generation-and-derivation) on the Offline
Signing with Atto Commons page provides an example for generating a seed phrase mnemonic, a private key and a matching
public key. Alternatively, a random private key can be generated by running `openssl rand -hex 32` from the command
line.

Keep your private key safe as it can be used to impersonate your node.

#### For External Signer (using `attocash/signer` sidecar):

**Node Container:**

| Variable                   | Purpose                                                  | Example                 |
|----------------------------|----------------------------------------------------------|-------------------------|
| `ATTO_SIGNER_BACKEND`      | Instructs the node to use a remote signer.               | `REMOTE`                |
| `ATTO_SIGNER_REMOTE_URL`   | URL of the signer service (typically a local sidecar).   | `http://localhost:9090` |
| `ATTO_SIGNER_REMOTE_TOKEN` | Bearer token for authenticating with the signer service. | `your-secure-token`     |

**Signer Sidecar Container (e.g., `ghcr.io/attocash/signer`):**

| Variable                      | Purpose                                                                        | Example                                                                                                    |
|-------------------------------|--------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| `ATTO_SIGNER_BACKEND`         | Specifies the backend KMS provider for the signer.                             | `GCP`                                                                                                      |
| `ATTO_SIGNER_KEY`             | Full resource ID of the KMS key version.                                       | `projects/your-gcp-project/locations/global/keyRings/your-keyring/cryptoKeys/your-key/cryptoKeyVersions/1` |
| `ATTO_SIGNER_TOKEN`           | Required for incoming requests.                                                | `your-secure-token`                                                                                        |
| `ATTO_SIGNER_PORT`            | Port the signer service listens on.                                            | `9090`                                                                                                     |
| `ATTO_SIGNER_MANAGEMENT_PORT` | Port for health checks and metrics for the signer.                             | `9091`                                                                                                     |
| `ATTO_SIGNER_CAPABILITIES`    | Comma-separated list of actions the signer is allowed to perform. For a voter: | `CHALLENGE,VOTE`                                                                                           |

## Choose a Deployment Method

- [Docker](/docs/integration/node/docker) provides complete Docker Compose configurations, including MySQL, startup,
  monitoring, and database reset instructions.
- [Kubernetes](/docs/integration/node/kubernetes) provides historical and voter manifests, including the GCP KMS signer
  sidecar example.
