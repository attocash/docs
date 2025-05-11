---
sidebar_position: 5
---

# Wallet Server

The Atto Wallet Server is a self-hostable application that provides an API for managing accounts, sending and receiving
transactions, and checking balances on the Atto network. It's designed to be used by applications, offering a simplified
interface that abstracts the complexities of direct node interaction.

The primary functions of the Wallet Server include:

* Creating and managing wallets.
* Creating and managing accounts within those wallets.
* Sending Atto tokens.
* Receiving Atto tokens (typically handled by accounts automatically reflecting incoming funds).
* Querying account history and balances.

The Wallet Server interacts with an Atto Node for blockchain data and a Work Server for Proof of Work calculations
necessary for sending transactions. The full OpenAPI specification for the api can be found at the
[Wallet Open Doc](/api/wallet).

## Synchronous Operations and Timeouts

Atto network transactions are designed to be extremely fast. Consequently,the Wallet Server API operates synchronously
for most actions, including sending transactions.

Key considerations for timeouts:

* **Node Transaction Expiry:** Transactions broadcast to an Atto node typically expire if not confirmed within
  approximately 30 seconds.
* **Client Timeout Recommendation:** When integrating with the Wallet Server, it's generally reasonable to configure
  HTTP clients with a timeout of around 1 minute. While typical operations will be much faster (often sub-second,
  depending on Work Server performance), this provides a buffer for PoW computation and network latency.

## Quick Reference

### Ports

| Port     | Purpose                                                   | Exposure               |
|----------|-----------------------------------------------------------|------------------------|
| **8080** | REST APIs. Refer to the [OpenAPI definition](/api/wallet) | Cluster‑internal only. |
| **8081** | Liveness `/health` & metrics `/prometheus`                | Cluster‑internal only. |

### Environment Variables

| Variable                       | Purpose                                                                                                                                                                                                      | Example Value                  | Required |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------|----------|
| `ATTO_DB_HOST`                 | Hostname or service name of the MySQL database.                                                                                                                                                              | `wallet-server-mysql`          | Yes      |
| `ATTO_DB_NAME`                 | Name of the database for the Wallet Server.                                                                                                                                                                  | `wallet-server`                | Yes      |
| `ATTO_DB_USER`                 | Username for connecting to the database.                                                                                                                                                                     | `root`                         | Yes      |
| `ATTO_DB_PASSWORD`             | Password for the database user.                                                                                                                                                                              | `your-secure-db-password`      | Yes      |
| `NETWORK`                      | The Atto network type the Wallet Server is configured for.                                                                                                                                                   | `local`, `dev`, `beta`, `live` | Yes      |
| `CHA_CHA20_KEY_ENCRYPTION_KEY` | A 32-byte hex-encoded Key Encryption Key (KEK). This key is used to encrypt the wallet's mnemonic encryption key when it's stored at rest (e.g., after a wallet is unlocked). **This is a critical secret.** | `0000..00000`                  | Yes      |
| `NODE_BASE_URL`                | Base URL of the Atto Node API that the Wallet Server will connect to.                                                                                                                                        | `http://node:8080`             | Yes      |
| `WORK_BASE_URL`                | Base URL of the Work Server API that the Wallet Server will use for PoW calculations.                                                                                                                        | `http://work-server:8080`      | Yes      |

## Kubernetes Example

<details>
<summary>View Details</summary>

This example demonstrates how to deploy the Wallet Server on Kubernetes. It assumes:

* You have a Kubernetes cluster.
* A MySQL-compatible database is accessible (e.g., via a service named `wallet-server-mysql-service`).
* Kubernetes `Secret`s are used to store sensitive data like database credentials and the
  `CHA_CHA20_KEY_ENCRYPTION_KEY`.
* An Atto Node is accessible at `http://node-service:8080`.
* A Work Server is accessible at `http://work-server-service:8080`.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: wallet-server-secrets
  # namespace: your-namespace # Optional: specify namespace
type: Opaque
stringData:
  ATTO_DB_PASSWORD: "your-secure-db-password" # Replace with your actual DB password
  CHA_CHA20_KEY_ENCRYPTION_KEY: "F1C87979CEFB9EF4DEC1F042017543152352E0983D6535038EAC5C21A692A9B3" # Replace with your actual KEK

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wallet-server
  # namespace: your-namespace # Optional: specify namespace
  labels:
    app: wallet-server
spec:
  replicas: 1
  selector:
    matchLabels:
      app: wallet-server
  template:
    metadata:
      labels:
        app: wallet-server
    spec:
      containers:
        - name: wallet-server
          image: "ghcr.io/attocash/wallet-server:07345041720ccec99b1b985a22b5591f355df619"
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 8080 # REST API
            - name: management
              containerPort: 8081 # Management port
          env:
            - name: ATTO_DB_HOST
              value: "wallet-server-mysql-service" # Adjust to your DB service name
            - name: ATTO_DB_NAME
              value: "wallet-server"
            - name: ATTO_DB_USER
              value: "root" # Or your specific DB user
            - name: ATTO_DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: wallet-server-secrets
                  key: ATTO_DB_PASSWORD
            - name: NETWORK
              value: "live"
            - name: CHA_CHA20_KEY_ENCRYPTION_KEY
              valueFrom:
                secretKeyRef:
                  name: wallet-server-secrets
                  key: CHA_CHA20_KEY_ENCRYPTION_KEY
            - name: NODE_BASE_URL
              value: "http://node-service:8080" # Adjust to your Node service URL
            - name: WORK_BASE_URL
              value: "http://work-server-service:8080" # Adjust to your Work Server service URL
          resources:
            requests:
              cpu: "0.5"
              memory: "512Mi"
            limits:
              cpu: "1"
              memory: "1Gi"
          startupProbe:
            httpGet:
              path: /health
              port: http-mgmt # Port 8081
            failureThreshold: 30
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: http-mgmt # Port 8081
            failureThreshold: 3
            periodSeconds: 20
          readinessProbe:
            httpGet:
              path: /health
              port: http-mgmt # Port 8081
            initialDelaySeconds: 5
            periodSeconds: 10
```

</details>
