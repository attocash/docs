---
sidebar_position: 1
---

# Historical Node

A **historical node** is the network’s long‑term memory. It publishes the full ledger to the rest of the network,
letting new peers bootstrap quickly while giving you direct access to the data.

Because all state is persisted in MySQL, you can wire it straight into your existing infrastructure and analytics
pipelines.

## Quick Reference

### Ports

| Port     | Purpose                                                 | Exposure                                                     |
|----------|---------------------------------------------------------|--------------------------------------------------------------|
| **8080** | REST APIs. Refer to the [OpenAPI definition](/api/node) | Cluster‑internal only.                                       |
| **8081** | Liveness `/health` & metrics `/prometheus`              | Cluster‑internal only.                                       |
| **8082** | Node‑to‑node gossip (WebSocket)                         | Terminate TLS at the load‑balancer / ingress. Public‑facing. |

### Required Environment Variables

| Variable           | Purpose                                    | Example                       |
|--------------------|--------------------------------------------|-------------------------------|
| `ATTO_PUBLIC_URI`  | External WebSocket URI advertised to peers | `wss://atto.example.com:8082` |
| `ATTO_DB_HOST`     | MySQL hostname or service                  | `mysql`                       |
| `ATTO_DB_NAME`     | Database name                              | `atto`                        |
| `ATTO_DB_USER`     | DB user with read/write perms              | `root`                        |
| `ATTO_DB_PASSWORD` | User password                              | `super-secret`                |

> Tip: When bootstrapping a new historical node, it is recommended to vertically scale your
> MySQL database (e.g., by providing more CPU/RAM) until the node fully catches up with the network. A node is generally
> considered in sync when there are no more unchecked transactions in its database. However, please note that due to the
> asynchronous nature of Atto, some smaller and inactive accounts might take a bit longer to reflect their absolute
> latest state even after the primary sync process appears complete.

## Kubernetes Example

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
              value: "wss://atto.example.com:8082"
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
            - containerPort: 8080 # REST
            - containerPort: 8081 # health + metrics
            - containerPort: 8082 # gossip WS
```

</details>

## Docker Example

<details>
<summary>View Details</summary>

This section guides you through setting up a minimal Atto historical node along with a MySQL 8.4 database using Docker
Compose.

**Steps:**

1. **Create a Directory:**
   First, create a new, empty directory on your system. This directory will hold your Docker Compose configuration and
   the persistent MySQL data.
   ```bash
   mkdir atto-historical-node
   cd atto-historical-node
   ```

2. **Create the Docker Compose File:**
   Inside the `atto-historical-node` directory, create a file named `docker-compose.yml`.

3. **Paste the Configuration:**
   Open the `docker-compose.yml` file in a text editor and paste the following content into it:

```yaml
# docker-compose.yml
services:
  node-mysql:
    image: "mysql:8.4"
    environment:
      MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
      MYSQL_DATABASE: "node"
      MYSQL_ROOT_PASSWORD: "root"
    volumes:
      - node_mysql_data:/var/lib/mysql
    healthcheck:
      test: [ "CMD", "mysqladmin", "ping", "-h", "localhost" ]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  node:
    image: "ghcr.io/attocash/node:live"
    ports:
      - "8080:8080"   # REST
      - "8081:8081"   # health + metrics
      - "8082:8082"   # gossip WS
    environment:
      ATTO_PUBLIC_URI: "ws(s)://{external ip or domain}:8082"
      ATTO_DB_HOST: "node-mysql"
      ATTO_DB_NAME: "node"
      ATTO_DB_USER: "root"
      ATTO_DB_PASSWORD: "root"
    depends_on:
      - node-mysql
    restart: unless-stopped

volumes:
  node_mysql_data:
```

You should modify the `ATTO_PUBLIC_URI`, `ATTO_DB_NAME`, `ATTO_DB_USER`, `ATTO_DB_PASSWORD`, and other settings to suit
your setup like port mapping.

:::warning
Don't forget to set `ATTO_PUBLIC_URI`, otherwise your node won't be reachable. `{external-ip}` should be replaced with
your actual public IP address, which can be found at [whatismyip.com](https://www.whatismyip.com).
:::

</details>
