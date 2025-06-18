---
sidebar_position: 2
---

# Voter Node

A **Voter Node** participates actively in the network's consensus mechanism by validating transactions and voting on
blocks. This role is critical for the security and progression of the Atto ledger.

The key distinction between a Voter Node and a Historical Node lies in the presence of a cryptographic signing
capability. If a node is configured with a private key or an external signer (like GCP KMS), it will operate as a Voter
Node.

**Important:** Once a node is initialized as a Voter Node (by detecting a private key or signer configuration), its role
cannot be changed to a Historical Node without a complete re-bootstrap. This process involves wiping its database and
starting fresh. Similarly, a Historical Node cannot be converted into a Voter Node without re-bootstrapping.

## Signing Mechanisms

A Voter Node requires a mechanism to sign votes and other network messages. There are two primary ways to configure
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

## Quick Reference

These are in addition to the common variables like `ATTO_DB_HOST`, `ATTO_DB_NAME`, etc., shared with Historical Nodes.

### Ports

| Port     | Purpose                                    | Exposure                                                     |
|----------|--------------------------------------------|--------------------------------------------------------------|
| **8080** | Do not use                                 | Private                                                      |
| **8081** | Liveness `/health` & metrics `/prometheus` | Cluster‑internal only.                                       |
| **8082** | Node‑to‑node gossip (WebSocket)            | Terminate TLS at the load‑balancer / ingress. Public‑facing. |

### For Direct Private Key:

| Variable           | Purpose                                       | Example                                                            |
|--------------------|-----------------------------------------------|--------------------------------------------------------------------|
| `ATTO_PRIVATE_KEY` | Ed25519 private key in hex format (64 chars). | `0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef` |

### For External Signer (using `attocash/signer` sidecar):

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

## Minimum Requirements

The minimum requirements for running a voter node are:

- A stable internet connection
- 1 CPU core (10 years old or newer)
- 1 GB of RAM

## Kubernetes Example

The following examples demonstrate deploying a Voter Node on Kubernetes. They assume:

* You have a Kubernetes cluster.
* A `Secret` named `atto-db-credentials` exists in the same namespace, containing keys `NAME`, `USER`, and `PASSWORD`
  for your database.
* A reachable MySQL-compatible database service named `mysql-service` exists in the same namespace.
* For the GCP KMS example, the Kubernetes Service Account used by the signer pod has appropriate IAM permissions (
  `roles/cloudkms.signerVerifier` for the KMS key and `roles/iam.workloadIdentityUser` if using Workload Identity).

### Example 1: Voter Node with Direct Private Key

This example uses the `ATTO_PRIVATE_KEY` environment variable.

<details>
<summary>View Details</summary>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: atto-voter-pk
  labels:
    app: atto-voter-pk
spec:
  replicas: 1
  selector:
    matchLabels:
      app: atto-voter-pk
  template:
    metadata:
      labels:
        app: atto-voter-pk
        role: voter
    spec:
      containers:
        - name: node
          image: ghcr.io/attocash/node:1-live # Or your desired version
          env:
            - name: ATTO_PUBLIC_URI
              value: "wss://your-voter-node.example.com:8082" # Adjust domain and port
            - name: ATTO_DB_HOST
              value: "mysql-service" # Or your DB service name
            - name: ATTO_DB_NAME
              valueFrom:
                secretKeyRef:
                  name: atto-db-credentials
                  key: NAME
            - name: ATTO_DB_USER
              valueFrom:
                secretKeyRef:
                  name: atto-db-credentials
                  key: USER
            - name: ATTO_DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: atto-db-credentials
                  key: PASSWORD
            - name: ATTO_PRIVATE_KEY # Directly providing the private key
              valueFrom:
                secretKeyRef:
                  name: atto-voter-secrets # Assumes a secret "atto-voter-secrets"
                  key: ED25519_PRIVATE_KEY_HEX # With the hex private key
            # Add other relevant environment variables (logging, etc.)
            # LOGGING_LEVEL_CASH_ATTO_NODE_VOTE: "DEBUG" # Example
          ports:
            - containerPort: 8080 # REST API
            - containerPort: 8081 # Health & Metrics
            - containerPort: 8082 # Gossip WebSocket
          # Define resources, probes (liveness, readiness, startup) as needed
          resources:
            requests:
              memory: "2Gi"
              cpu: "0.5"
            limits:
              memory: "2Gi"
              cpu: "0.5"
          startupProbe:
            httpGet:
              path: /health
              port: 8081
            failureThreshold: 180
            periodSeconds: 1
          livenessProbe:
            httpGet:
              path: /health
              port: 8081
            failureThreshold: 5
            periodSeconds: 60
```

**Note:** Ensure a Kubernetes `Secret` named `atto-voter-secrets` (or your chosen name) exists with a key like
`ED25519_PRIVATE_KEY_HEX` holding the private key. Example Secret:

```yaml
 apiVersion: v1
 kind: Secret
 metadata:
   name: atto-voter-secrets
 type: Opaque
 stringData:
   ED25519_PRIVATE_KEY_HEX: "your64characterhexprivatekeyhere..."
```

</details>

### Example 2: Voter Node with GCP KMS Signer (Sidecar)

This example deploys the Atto node with a [`signer`](/docs/integration/signer) container configured for GCP KMS.

<details>
<summary>View Details</summary>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: atto-voter-gcp-kms
  labels:
    app: atto-voter-gcp-kms
spec:
  replicas: 1
  selector:
    matchLabels:
      app: atto-voter-gcp-kms
  template:
    metadata:
      labels:
        app: atto-voter-gcp-kms
        role: voter
    spec:
      serviceAccountName: your-gcp-kms-enabled-sa # Crucial: K8s SA mapped to GCP SA with KMS permissions
      containers:
        - name: node
          image: ghcr.io/attocash/node:1-live # Specify your desired image tag
          env:
            - name: ATTO_PUBLIC_URI
              value: "wss://your-voter-node.example.com:8082" # Update with your public URI
            - name: ATTO_DB_HOST
              value: "mysql-service" # Your database service name
            - name: ATTO_DB_NAME
              valueFrom:
                secretKeyRef:
                  name: atto-db-credentials
                  key: NAME
            - name: ATTO_DB_USER
              valueFrom:
                secretKeyRef:
                  name: atto-db-credentials
                  key: USER
            - name: ATTO_DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: atto-db-credentials
                  key: PASSWORD
            - name: ATTO_SIGNER_BACKEND
              value: "REMOTE"
            - name: ATTO_SIGNER_REMOTE_URL
              value: "http://localhost:9090" # Node talks to signer sidecar on localhost
            - name: ATTO_SIGNER_REMOTE_TOKEN
              valueFrom:
                secretKeyRef:
                  name: atto-signer-secrets # Secret for the shared token
                  key: SIGNER_SHARED_TOKEN
            # Add other node-specific environment variables as needed
          ports:
            - containerPort: 8080
            - containerPort: 8081
            - containerPort: 8082
          resources:
            requests:
              memory: "2Gi"
              cpu: "0.5"
            limits:
              memory: "2Gi"
              cpu: "0.5"
          startupProbe:
            httpGet:
              path: /health
              port: 8081
            failureThreshold: 180
            periodSeconds: 1
          livenessProbe:
            httpGet:
              path: /health
              port: 8081
            failureThreshold: 5
            periodSeconds: 60

        - name: signer
          image: ghcr.io/attocash/signer:1-release # Specify your desired signer image tag
          env:
            - name: ATTO_SIGNER_BACKEND
              value: "GCP"
            - name: ATTO_SIGNER_KEY # Full GCP KMS Key Version Resource ID
              value: "projects/your-gcp-project/locations/your-region/keyRings/your-keyring/cryptoKeys/your-atto-key/cryptoKeyVersions/1"
            - name: ATTO_SIGNER_PORT
              value: "9090"
            - name: ATTO_SIGNER_MANAGEMENT_PORT
              value: "9091"
            - name: ATTO_SIGNER_CAPABILITIES
              value: "CHALLENGE,VOTE"
            - name: ATTO_SIGNER_TOKEN # Signer expects this token from the node
              valueFrom:
                secretKeyRef:
                  name: atto-signer-secrets
                  key: SIGNER_SHARED_TOKEN
            # Add other signer-specific environment variables if needed
          ports:
            - containerPort: 9090 # Signer service port (for node)
            - containerPort: 9091 # Signer management port (health/metrics)
          resources:
            requests:
              memory: "256Mi"
              cpu: "0.1"
            limits:
              memory: "256Mi"
              cpu: "0.1"
          securityContext: # Example based on your HCL; adjust as necessary
            allowPrivilegeEscalation: false
            capabilities:
              drop:
                - "NET_RAW"
            # privileged: false
            # readOnlyRootFilesystem: false # Set based on signer image needs
            # runAsNonRoot: false # Set based on signer image needs
          startupProbe:
            httpGet:
              path: /health # Signer's health endpoint
              port: 9091
            failureThreshold: 180
            periodSeconds: 1
          livenessProbe:
            httpGet:
              path: /health
              port: 9091
            failureThreshold: 5
            periodSeconds: 60
      # affinity, priorityClassName, etc., can be added based on your full HCL configuration
```

**Important Considerations for GCP KMS Signer:**

* **Service Account Permissions:** The `serviceAccountName` (e.g., `your-gcp-kms-enabled-sa`) for the pod must be
  correctly configured. If using GKE Workload Identity, this Kubernetes Service Account (KSA) must be bound to a GCP
  Service Account (GSA) that has the `roles/cloudkms.signerVerifier` permission on the specified GCP KMS key version.
* **Shared Token:** The `ATTO_SIGNER_REMOTE_TOKEN` (for the node) and `ATTO_SIGNER_TOKEN` (for the signer sidecar) must
  be identical. This token should be a strong, randomly generated string stored securely in a Kubernetes `Secret` (e.g.,
  `atto-signer-secrets`).
  Example Secret for the shared token:
  ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: atto-signer-secrets
   type: Opaque
   stringData:
     SIGNER_SHARED_TOKEN: "your-very-strong-randomly-generated-token"
  ```

</details>
