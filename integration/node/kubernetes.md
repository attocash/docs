---
sidebar_position: 2
---

# Kubernetes

Use this page to deploy an Atto historical or voter node on Kubernetes. Review the shared
[node requirements and quick reference](/docs/integration/node) before choosing a manifest.

The manifests assume MySQL is provided as a separate reachable service. Size the node and database independently.

## Historical Node {#historical-node}

<details>
<summary>View Details</summary>

Below is a trimmed manifest that assumes you already have a `Secret` named `atto-db` containing your database
credentials and a reachable MySQL service called `mysql`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: atto-historical
  labels:
    app: atto-historical
spec:
  replicas: 1
  selector:
    matchLabels:
      app: atto-historical
  template:
    metadata:
      labels:
        app: atto-historical
        role: historical
    spec:
      containers:
        - name: node
          image: ghcr.io/attocash/node:live
          env:
            - name: ATTO_PUBLIC_URI
              value: "wss://replace-with-your-public-hostname.invalid:8082"
            - name: ATTO_DB_HOST
              value: "mysql"
            - name: ATTO_DB_NAME
              valueFrom:
                secretKeyRef:
                  name: atto-db
                  key: NAME
            - name: ATTO_DB_USER
              valueFrom:
                secretKeyRef:
                  name: atto-db
                  key: USER
            - name: ATTO_DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: atto-db
                  key: PASSWORD
          ports:
# Only uncomment these two lines if you have placed these ports behind a web-application firewall (WAF) at minimum
#            - containerPort: 8080 # REST
#            - containerPort: 8081 # health + metrics
            - containerPort: 8082 # gossip WS
```

You should modify the `ATTO_PUBLIC_URI`, `ATTO_DB_NAME`, `ATTO_DB_USER`, `ATTO_DB_PASSWORD`, and other settings as
explained in the [quick reference](/docs/integration/node#quick-reference) to suit your setup like port mapping.

</details>

## Voter Node {#voter-with-a-direct-private-key}

<a id="voter-node"></a>

<details>
<summary>View Details</summary>

This example uses the `ATTO_PRIVATE_KEY` environment variable. It assumes:

* You have a Kubernetes cluster.
* A `Secret` named `atto-db-credentials` exists in the same namespace, containing keys `NAME`, `USER`, and `PASSWORD`
  for your database.
* A reachable MySQL-compatible database service named `mysql-service` exists in the same namespace.

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
          image: ghcr.io/attocash/node:live # Or your desired version
          env:
            - name: ATTO_PUBLIC_URI
              value: "wss://replace-with-your-public-hostname.invalid:8082" # Adjust domain and port
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
# Only uncomment this line if you have placed port 8081 behind a web-application firewall (WAF) at minimum
#            - containerPort: 8081 # Health & Metrics
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


You should modify the `ATTO_PUBLIC_URI`, `ATTO_DB_NAME`, `ATTO_DB_USER`, `ATTO_DB_PASSWORD`, and other settings as
explained in the [quick reference](/docs/integration/node#quick-reference) and [voting node quick reference](/docs/integration/node#voting-node-quick-reference) to
suit your setup like port mapping.

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

## Voter Node - External Signer {#voter-with-a-gcp-kms-signer}

<details>
<summary>View Details</summary>

This example deploys the Atto node with a [`signer`](/docs/integration/signer) sidecar configured for GCP KMS. It
assumes:

* You have a Kubernetes cluster.
* A `Secret` named `atto-db-credentials` exists in the same namespace, containing keys `NAME`, `USER`, and `PASSWORD`
  for your database.
* A reachable MySQL-compatible database service named `mysql-service` exists in the same namespace.
* The Kubernetes Service Account used by the signer pod has appropriate IAM permissions
  (`roles/cloudkms.signerVerifier` for the KMS key and `roles/iam.workloadIdentityUser` if using Workload Identity).

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
          image: ghcr.io/attocash/node:live # Specify your desired image tag
          env:
            - name: ATTO_PUBLIC_URI
              value: "wss://replace-with-your-public-hostname.invalid:8082" # Update with your public URI
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
# Only uncomment this line if you have placed port 8081 behind a web-application firewall (WAF) at minimum
#            - containerPort: 8081
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
          image: ghcr.io/attocash/signer:release # Specify your desired signer image tag
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

You should modify the `ATTO_PUBLIC_URI`, `ATTO_DB_NAME`, `ATTO_DB_USER`, `ATTO_DB_PASSWORD`, and other settings as
explained in the [quick reference](/docs/integration/node#quick-reference) and [voting node quick reference](/docs/integration/node#voting-node-quick-reference) to
suit your setup like port mapping.

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
