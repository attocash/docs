---
sidebar_position: 3
---

# Signer

The Signer is a dedicated external application designed to handle cryptographic signing operations, typically for voting
nodes. Using an external signer is highly recommended for Voter Nodes to enhance security by decoupling private key
management from the node itself. This approach allows keys to be stored in secure systems like Cloud KMS providers.

## Overview

When a Voter Node is configured to use an external signer:

1. The Node itself does not need direct access to private keys.
2. The Node delegates signing operations (e.g., for votes, challenges) to the Signer application.
3. The Signer, in turn, interfaces with a configured backend (like GCP Cloud KMS) to perform the
   actual cryptographic signature.
4. Communication between the Node and the Signer is typically secured by a shared bearer token.

This setup is commonly deployed using a **sidecar pattern** in containerized environments like Kubernetes, where the
`signer` container runs alongside the `node` container in the same pod.

## Supported Backends

Currently, the Signer application primarily supports:

* **Google Cloud Key Management Service (GCP KMS):** Leverages GCP's robust infrastructure for key storage and signing.

If you require support for other KMS vendors (e.g., AWS KMS, Azure Key Vault) or different signing mechanisms, please
consider opening an issue or contributing to
the [attocash/signer GitHub repository](https://github.com/attocash/signer).

## Configuration

The application is configured via environment variables.

### Environment Variables

These variables are specific to the `signer` container (e.g., `ghcr.io/attocash/signer`).

| Variable                      | Purpose                                                                                                | Example (for GCP KMS)                                                                                      | Required |
|-------------------------------|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|----------|
| `ATTO_SIGNER_BACKEND`         | Specifies the backend KMS provider for the signer.                                                     | `GCP`                                                                                                      | Yes      |
| `ATTO_SIGNER_KEY`             | Full resource ID of the KMS key version to be used for signing.                                        | `projects/your-gcp-project/locations/global/keyRings/your-keyring/cryptoKeys/your-key/cryptoKeyVersions/1` | Yes      |
| `ATTO_SIGNER_PORT`            | Port on which the signer service will listen for incoming requests from the Node.                      | `9090` (default)                                                                                           | No       |
| `ATTO_SIGNER_MANAGEMENT_PORT` | Port for exposing health checks (`/health`) and metrics (`/prometheus`) for the signer itself.         | `9091` (default)                                                                                           | No       |
| `ATTO_SIGNER_TOKEN`           | A secure bearer token that the signer will require for authenticating incoming requests from the node. | `your-very-secure-shared-token`                                                                            | Yes      |
| `ATTO_SIGNER_CAPABILITIES`    | Comma-separated list of actions the signer is authorized to perform.                                   | `CHALLENGE,VOTE`                                                                                           | Yes      |

**Note on `ATTO_SIGNER_CAPABILITIES`:**
This variable defines the scope of operations the signer can perform. For a Voter Node, the capabilities typically
include:

* `CHALLENGE`: Signing challenge responses.
* `VOTE`: Signing votes for consensus.
  Ensure these are appropriate for the operations the connected Node will request.

### Ports

The `signer` application exposes the following ports:

| Port     | Purpose                                    | Exposure               |
|----------|--------------------------------------------|------------------------|
| **9090** | REST API                                   | Cluster‑internal only. |
| **9091** | Liveness `/health` & metrics `/prometheus` | Cluster‑internal only. |

## GCP KMS Specifics

When using `ATTO_SIGNER_BACKEND: GCP`:

* **Key Version:** The `ATTO_SIGNER_KEY` must be the full resource ID of a specific *cryptoKeyVersion* in GCP KMS. The
  key must be an Ed25519 signing key.
* **IAM Permissions:** The identity running the `signer` application (e.g., a Kubernetes Service Account federated with
  a GCP Service Account via Workload Identity) needs the following IAM permissions on the specified KMS key version:
* `cloudkms.cryptoKeyVersions.viewPublicKey`: To retrieve the public key associated with the signing key.
* `cloudkms.cryptoKeyVersions.useToSign`: To perform signing operations.
* A common role that grants these is `roles/cloudkms.signerVerifier`.

Refer to the [GCP KMS documentation](https://cloud.google.com/kms/docs) for more details on managing keys and
permissions.

## Security Best Practices

* **Secure Token:** The `ATTO_SIGNER_TOKEN` (and its counterpart `ATTO_SIGNER_REMOTE_TOKEN` on the Node) must be a
  strong, unique, randomly generated secret. Store it securely, for example, using Kubernetes Secrets.
* **Least Privilege for KMS Keys:** Grant the signer's identity only the necessary permissions (`viewPublicKey`,
  `useToSign`) on the specific KMS key it needs to use. Avoid granting broader KMS permissions.
* **Network Segregation:** The signer's service port (`ATTO_SIGNER_PORT`) should only be accessible by the Node it
  serves, typically within the same pod (localhost communication). It should not be exposed publicly.
* **Image Integrity:** Always use official `ghcr.io/attocash/signer` images from trusted sources.

## Deployment

The Signer is typically deployed as a sidecar container alongside the Node container within the same
Kubernetes Pod. This co-location allows secure and efficient communication over `localhost`.

For a detailed Kubernetes deployment example showing the `node` and `signer` containers working together, please refer
to the **"Example 2: Voter Node with GCP KMS Signer (Sidecar)"** section in
the [Voter Node documentation](./node-voter.md#example-2-voter-node-with-gcp-kms-signer-sidecar).

The Kubernetes manifest in that example illustrates how to:

* Define both `node` and `signer` containers in a single `Deployment`.
* Configure environment variables for both, including the shared `ATTO_SIGNER_TOKEN` sourced from a Kubernetes Secret.
* Set up communication via `localhost` between the node and the signer.
* Configure necessary service accounts and permissions, particularly for GCP KMS integration.
