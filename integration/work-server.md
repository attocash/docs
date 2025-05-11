---
sidebar_position: 4
---

# Work Server

The Atto network operates without transaction fees. Instead, to prevent spam and prioritize network resources, it
requires a small amount of Proof of Work (PoW) to be computed for each transaction before it's submitted. The Work
Server is a dedicated service designed to perform these PoW computations.

Clients and applications wishing to send transactions on the Atto network will typically delegate the PoW calculation to
a Work Server.

## Why is a Work Server Required?

* **Fee-less Transactions:** Atto's design replaces monetary fees with computational work. This PoW needs to be
  generated for every transaction.
* **Resource Intensive:** While the PoW difficulty is generally low, it can still be resource-intensive, especially for
  devices with limited processing power or when submitting many transactions.
* **Centralized Computation (Optional):** Deploying a dedicated Work Server (or multiple) allows various applications
  and services to offload this computational task, streamlining their own operations.

## Performance Considerations

The time taken to compute the PoW can vary significantly based on the available hardware:

* **CPU:** Standard CPUs can compute the PoW, but it might take a noticeable amount of time, potentially several minutes
  for a single transaction depending on the CPU's performance. This might be acceptable for development or
  low-throughput scenarios.
* **GPU (Recommended for Live Environments):** For production or high-throughput environments, using GPUs is highly
  recommended. GPUs can perform the PoW calculations much faster.
  * For instance, an `nvidia-l4` GPU can typically calculate the required PoW in approximately 1 second.
  * Using a GPU significantly improves the user experience and the efficiency of submitting transactions.

**Community Support:**
If running and maintaining a dedicated GPU-accelerated Work Server is a barrier for your project, please reach out to
the Atto team. We are open to discussing options for sharing access to our Work Server resources to facilitate
adoption and development on the Atto network.

## Docker Images Available

The Work Server is available in two main image variants, typically hosted on `ghcr.io/attocash/work-server`:

* `ghcr.io/attocash/work-server:cpu`: Optimized for CPU-based PoW calculation.
* `ghcr.io/attocash/work-server:cuda`: Optimized for GPU-based PoW calculation using NVIDIA CUDA. This
  image requires a compatible NVIDIA GPU and drivers on the host machine/node.
  *`ghcr.io/attocash/work-server:rocm`: Optimized for GPU-based PoW calculation using AMD ROCM. This
  image requires a compatible AMD GPU and drivers on the host machine/node.

## Quick Reference

### Ports

| Port     | Purpose                                    | Exposure               |
|----------|--------------------------------------------|------------------------|
| **8080** | REST API                                   | Cluster‑internal only. |
| **8081** | Liveness `/health` & metrics `/prometheus` | Cluster‑internal only. |

## Kubernetes Examples

Below are examples of how to deploy a Work Server on Kubernetes.

### CPU-based

This manifest deploys a Work Server using the CPU image. It's suitable for development, testing, or low-traffic
scenarios.

<details>
<summary>View Details</summary>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: work-server-cpu
  namespace: work # Example namespace
  labels:
    app: work-server-cpu
spec:
  replicas: 1
  selector:
    matchLabels:
      app: work-server-cpu
  template:
    metadata:
      labels:
        app: work-server-cpu
    spec:
      containers:
        - name: work-server
          image: ghcr.io/attocash/work-server:cpu # CPU image
          imagePullPolicy: Always
          ports:
            - name: http
              containerPort: 8080
            - name: management
              containerPort: 8081
          resources:
            requests:
              cpu: "2" # Adjust based on expected load
              memory: "2Gi"
            limits:
              cpu: "2" # Adjust based on expected load
              memory: "2Gi"
              ephemeral-storage: "1Gi"
          startupProbe:
            httpGet:
              path: /health
              port: health # Refers to named port 'health' (8081)
            failureThreshold: 180
            periodSeconds: 1
          livenessProbe:
            httpGet:
              path: /health
              port: health # Refers to named port 'health' (8081)
            failureThreshold: 5
            periodSeconds: 60
```

</details>

### GPU-accelerated

<details>
<summary>View Details</summary>

This manifest deploys a Work Server using the CUDA image and targets a node with an NVIDIA L4 GPU. This is recommended
for live/production environments.

**Prerequisites:**

* Your Kubernetes nodes must have NVIDIA GPUs installed.
* NVIDIA device drivers and the Kubernetes device plugin for NVIDIA GPUs must be configured on your cluster.
* The example uses node selectors common in GKE for GPU resources. Adapt these to your cluster's specific
  configuration (e.g., for other cloud providers or on-premise setups).

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: work-server-gpu
  namespace: work # Example namespace
  labels:
    app: work-server-gpu
spec:
  replicas: 1
  selector:
    matchLabels:
      app: work-server-gpu
  template:
    metadata:
      labels:
        app: work-server-gpu
    spec:
      # Node selectors are crucial for scheduling pods on GPU-enabled nodes.
      # The specific selectors depend on your Kubernetes distribution and GPU setup.
      nodeSelector:
        cloud.google.com/gke-accelerator: nvidia-l4 # Example for GKE L4 GPU
        # For other environments, or more specific scheduling, adjust accordingly.
        # e.g., cloud.google.com/compute-class: "Accelerator"
        # If using reservations (as in the Terraform example):
        # cloud.google.com/reservation-name: "work-server-l4" # Replace with your reservation name
        # cloud.google.com/reservation-affinity: "specific"
      tolerations: # Often needed if GPU nodes have taints
        - key: "nvidia.com/gpu"
          operator: "Exists"
          effect: "NoSchedule" # Or "PreferNoSchedule"
      containers:
        - name: work-server
          image: ghcr.io/attocash/work-server:cuda # CUDA image for GPU
          imagePullPolicy: Always
          ports:
            - name: http
              containerPort: 8080
            - name: health
              containerPort: 8081
          resources:
            limits:
              nvidia.com/gpu: 1 # Request 1 NVIDIA GPU
              # memory: "4Gi" # Adjust memory as needed for GPU workloads
              # cpu: "1"      # Adjust CPU as needed
            requests:
              nvidia.com/gpu: 1 # Request 1 NVIDIA GPU
              # memory: "4Gi"
              # cpu: "1"
          startupProbe:
            httpGet:
              path: /health
              port: health # Refers to named port 'health' (8081)
            failureThreshold: 180
            periodSeconds: 1
          livenessProbe:
            httpGet:
              path: /health
              port: health # Refers to named port 'health' (8081)
            failureThreshold: 5
            periodSeconds: 60
```

</details>

**Note on GPU Deployment:**

* The `nodeSelector` and `tolerations` are critical for ensuring the pod is scheduled on a node with the required GPU
  resources. The exact labels and taints depend on how your Kubernetes cluster's GPU support is configured (e.g.,
  `nvidia.com/gpu` is common).
* The `resources.limits` and `resources.requests` for `nvidia.com/gpu: 1` ensure the pod is allocated one GPU. Adjust
  CPU and memory resources as needed.
* Ensure the `ghcr.io/attocash/work-server:cuda` image is compatible with the CUDA drivers installed on your GPU nodes.
