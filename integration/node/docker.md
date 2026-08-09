---
sidebar_position: 1
---

# Docker

Use this page to run an Atto historical or voter node with Docker Compose. Review the shared
[node requirements and quick reference](/docs/integration/node) before choosing a configuration.

The examples run MySQL on the same host, so use at least 2 GB of host RAM. The node service itself needs 1 GB; if MySQL
runs elsewhere, size that database host separately.

## Historical Node {#historical-node}

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
   touch .env compose.yaml
   printf '.env\n' > .gitignore
   chmod 600 .env
   ```

2. **Configure the Node:**
   Run `openssl rand -hex 32` to generate a database password, then add the following values to `.env`. Replace the
   `.invalid` hostname with the public hostname of your node:

   ```dotenv
   ATTO_DB_PASSWORD=replace-with-the-generated-password
   ATTO_PUBLIC_URI=wss://replace-with-your-public-hostname.invalid:8082
   ```

3. **Paste the Configuration:**
   Open `compose.yaml` in a text editor and paste the following content into it:

```yaml
services:
  node-mysql:
    image: "mysql:8.4"
    mem_swappiness: 0
    command:
      - "--performance-schema=OFF"
      - "--skip-log-bin"
      - "--innodb-buffer-pool-size=64M"
      - "--max-connections=32"
      - "--table-open-cache=400"
    environment:
      MYSQL_DATABASE: "node"
      MYSQL_USER: "node"
      MYSQL_PASSWORD: "${ATTO_DB_PASSWORD}"
      MYSQL_RANDOM_ROOT_PASSWORD: "yes"
    volumes:
      - node_mysql_data:/var/lib/mysql
    healthcheck:
      test:
        - CMD-SHELL
        - >-
          mysql --protocol=TCP -h 127.0.0.1
          -u"$${MYSQL_USER}" -p"$${MYSQL_PASSWORD}"
          "$${MYSQL_DATABASE}" -e "SELECT 1" >/dev/null 2>&1
      interval: 10s
      timeout: 5s
      retries: 12
      start_period: 30s
    restart: unless-stopped

  node:
    image: "ghcr.io/attocash/node:live"
    mem_limit: "1g"
    memswap_limit: "1g"
    ports:
      - "127.0.0.1:8080:8080" # REST
      - "127.0.0.1:8081:8081" # health + metrics
      - "8082:8082"   # gossip WS
    environment:
      ATTO_PUBLIC_URI: "${ATTO_PUBLIC_URI}"
      ATTO_DB_HOST: "node-mysql"
      ATTO_DB_NAME: "node"
      ATTO_DB_USER: "node"
      ATTO_DB_PASSWORD: "${ATTO_DB_PASSWORD}"
    depends_on:
      node-mysql:
        condition: service_healthy
    restart: unless-stopped

volumes:
  node_mysql_data:
```

You should modify the `ATTO_PUBLIC_URI`, `ATTO_DB_NAME`, `ATTO_DB_USER`, `ATTO_DB_PASSWORD`, and other settings as
explained in the [quick reference](/docs/integration/node#quick-reference) to suit your setup like port mapping.

</details>

## Voter Node {#voter-node}

<details>
<summary>View Details</summary>

This section guides you through setting up an Atto voter node along with a
MySQL 8.4 database using Docker Compose.

**Steps:**

1. **Create a Directory:**
   First, create a new, empty directory on your system. This directory will hold your Docker Compose configuration and
   the persistent MySQL data.
   ```bash
   mkdir atto-voter-node
   cd atto-voter-node
   touch .env compose.yaml
   printf '.env\n' > .gitignore
   chmod 600 .env
   ```

2. **Create the Configuration Files:**
   Use `.env` for secrets and `compose.yaml` for the services and non-secret settings.

3. **Paste the Configuration:**
   Add the values and Compose configuration from one of the examples below.

#### Example 1: Voter Node with Direct Private Key {#voter-with-a-direct-private-key}

This example uses the `ATTO_PRIVATE_KEY` environment variable rather than an external signer.

:::info
This example runs the node and MySQL on the same host, so the host needs at least 2 GB of RAM, including after the node
has synchronized. The node service itself needs 1 GB; if MySQL runs on another machine, size that database host
separately. An all-in-one host with an already-bootstrapped database may sometimes operate with 1 GB, but it is not
recommended and should not be used for a fresh bootstrap.
:::

Run `openssl rand -hex 32` to generate the voter private key and `printf 'mysql_%s\n' "$(openssl rand -hex 24)"` to
generate a visibly different database password, then add the values to `.env`. Replace the `.invalid` hostname with
the public hostname of your node:

```dotenv
ATTO_DB_PASSWORD=replace-with-the-generated-password
ATTO_PRIVATE_KEY=replace-with-the-generated-private-key
ATTO_PUBLIC_URI=wss://replace-with-your-public-hostname.invalid:8082
```

<details>
<summary>View Details</summary>

```yaml
services:
  node-mysql:
    image: "mysql:8.4"
    mem_swappiness: 0
    command:
      - "--performance-schema=OFF"
      - "--skip-log-bin"
      - "--innodb-buffer-pool-size=64M"
      - "--max-connections=32"
      - "--table-open-cache=400"
    environment:
      MYSQL_DATABASE: "node"
      MYSQL_USER: "node"
      MYSQL_PASSWORD: "${ATTO_DB_PASSWORD}"
      MYSQL_RANDOM_ROOT_PASSWORD: "yes"
    volumes:
      - node_mysql_data:/var/lib/mysql
    healthcheck:
      test:
        - CMD-SHELL
        - >-
          mysql --protocol=TCP -h 127.0.0.1
          -u"$${MYSQL_USER}" -p"$${MYSQL_PASSWORD}"
          "$${MYSQL_DATABASE}" -e "SELECT 1" >/dev/null 2>&1
      interval: 10s
      timeout: 5s
      retries: 12
      start_period: 30s
    restart: unless-stopped

  node:
    image: "ghcr.io/attocash/node:live"
    mem_limit: "1g"
    memswap_limit: "1g"
    ports:
      - "127.0.0.1:8081:8081" # health + metrics
      - "8082:8082"   # gossip WS
    environment:
      ATTO_PUBLIC_URI: "${ATTO_PUBLIC_URI}"
      ATTO_DB_HOST: "node-mysql"
      ATTO_DB_NAME: "node"
      ATTO_DB_USER: "node"
      ATTO_DB_PASSWORD: "${ATTO_DB_PASSWORD}"
      ATTO_PRIVATE_KEY: "${ATTO_PRIVATE_KEY}"
    depends_on:
      node-mysql:
        condition: service_healthy
    restart: unless-stopped

volumes:
  node_mysql_data:
```


You should modify the `ATTO_PUBLIC_URI`, `ATTO_DB_NAME`, `ATTO_DB_USER`, `ATTO_DB_PASSWORD`, and other settings as
explained in the [quick reference](/docs/integration/node#quick-reference) and [voting node quick reference](/docs/integration/node#voting-node-quick-reference) to
suit your setup like port mapping.

</details>

#### Example 2: Voter Node with GCP KMS Signer (Sidecar) {#voter-with-a-gcp-kms-signer}

This example deploys the Atto node with a [`signer`](/docs/integration/signer) container configured for GCP KMS.

Add the following to `.env`, using separate random values for the database password and signer token. Replace the
`.invalid` hostname with the public hostname of your node:

```dotenv
ATTO_DB_PASSWORD=replace-with-a-random-password
ATTO_SIGNER_TOKEN=replace-with-a-random-token
ATTO_PUBLIC_URI=wss://replace-with-your-public-hostname.invalid:8082
```

The signer adds another 512 MiB memory limit, so use more than 2 GB of host RAM for this three-container setup.

<details>
<summary>View Details</summary>

```yaml
services:
  node-mysql:
    image: "mysql:8.4"
    mem_swappiness: 0
    command:
      - "--performance-schema=OFF"
      - "--skip-log-bin"
      - "--innodb-buffer-pool-size=64M"
      - "--max-connections=32"
      - "--table-open-cache=400"
    environment:
      MYSQL_DATABASE: "node"
      MYSQL_USER: "node"
      MYSQL_PASSWORD: "${ATTO_DB_PASSWORD}"
      MYSQL_RANDOM_ROOT_PASSWORD: "yes"
    volumes:
      - node_mysql_data:/var/lib/mysql
    healthcheck:
      test:
        - CMD-SHELL
        - >-
          mysql --protocol=TCP -h 127.0.0.1
          -u"$${MYSQL_USER}" -p"$${MYSQL_PASSWORD}"
          "$${MYSQL_DATABASE}" -e "SELECT 1" >/dev/null 2>&1
      interval: 10s
      timeout: 5s
      retries: 12
      start_period: 30s
    restart: unless-stopped

  signer:
    image: "ghcr.io/attocash/signer:release"
    mem_limit: "512m"
    memswap_limit: "512m"
    environment:
      ATTO_SIGNER_BACKEND: "GCP"
      ATTO_SIGNER_KEY: "projects/example/locations/global/keyRings/atto/cryptoKeys/voter/cryptoKeyVersions/1"
      ATTO_SIGNER_TOKEN: "${ATTO_SIGNER_TOKEN}"
      GOOGLE_APPLICATION_CREDENTIALS: "/secrets/atto-signer.json"
      ATTO_SIGNER_CAPABILITIES: "CHALLENGE,VOTE"
    healthcheck:
      test: [ "CMD", "curl", "-f", "http://localhost:9091/health" ]
      interval: 60s
      timeout: 10s
      retries: 5
      start_period: 180s
    volumes:
      - "./atto-signer.json:/secrets/atto-signer.json:ro"
    restart: unless-stopped

  node:
    image: "ghcr.io/attocash/node:live"
    mem_limit: "1g"
    memswap_limit: "1g"
    ports:
      - "127.0.0.1:8081:8081" # health + metrics
      - "8082:8082"   # gossip WS
    environment:
      ATTO_PUBLIC_URI: "${ATTO_PUBLIC_URI}"
      ATTO_DB_HOST: "node-mysql"
      ATTO_DB_NAME: "node"
      ATTO_DB_USER: "node"
      ATTO_DB_PASSWORD: "${ATTO_DB_PASSWORD}"
      ATTO_SIGNER_BACKEND: "REMOTE"
      ATTO_SIGNER_REMOTE_URL: "http://signer:9090"
      ATTO_SIGNER_REMOTE_TOKEN: "${ATTO_SIGNER_TOKEN}"
    depends_on:
      node-mysql:
        condition: service_healthy
      signer:
        condition: service_healthy
    restart: unless-stopped

volumes:
  node_mysql_data:
```

You should modify the `ATTO_PUBLIC_URI`, `ATTO_DB_NAME`, `ATTO_DB_USER`, `ATTO_DB_PASSWORD`, and other settings as
explained in the [quick reference](/docs/integration/node#quick-reference) and [voting node quick reference](/docs/integration/node#voting-node-quick-reference) to
suit your setup like port mapping.

**Important Considerations for GCP KMS Signer:**

* **Service Account**: `{your service account key file}` should be replaced
  with the relative path of your GCP service account key (a JSON file), which
  you should have downloaded from GCP.
* **Key Version**: `ATTO_SIGNER_KEY` should be the resource name of the key
  version, as obtained from GCP.
* **Shared Token:** The `ATTO_SIGNER_REMOTE_TOKEN` (for the node) and `ATTO_SIGNER_TOKEN` (for the signer sidecar) must
  be identical. This token should be a strong, randomly generated string.

</details>

</details>

## Starting and Monitoring a Docker Node

Allow inbound TCP port 8082 in both the provider firewall and the host firewall. Keep ports 8080 and 8081 private.
Publishing a port in Docker Compose does not bypass either firewall.

Validate and start the configuration:

```bash
docker compose config --quiet
docker compose up -d
docker compose ps
```

The node waits for an authenticated MySQL health check before starting. Check its health, logs, height, and unchecked
transactions with:

```bash
curl --fail http://127.0.0.1:8081/health
docker compose logs --tail 200 node
curl --fail http://127.0.0.1:8081/metrics/account.height.count
curl -fsSL https://gatekeeper.live.application.atto.cash/projections/metrics \
  | jq -r '.metrics[] | select(.name == "account.height.count") | .value'
docker compose exec node-mysql sh -c \
  'mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" -e \
  "SELECT COALESCE(SUM(height), 0) AS account_height FROM account; \
   SELECT COUNT(*) AS unchecked FROM unchecked_transaction;"'
```

To intentionally delete the local ledger and start a fresh bootstrap, stop both services before removing the volume:

```bash
docker compose down --volumes
docker compose up -d
```

This permanently deletes the local node database. Never remove or modify the MySQL volume while either service is
running.
