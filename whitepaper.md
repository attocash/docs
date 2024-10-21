---
sidebar_position: 1
---

# Whitepaper

Atto is designed to provide instant, feeless transactions with a minimal environmental footprint. By utilizing an open representative consensus and a lightweight protocol, Atto aims to offer a sustainable, scalable, and user-friendly solution for digital payments.

With a focus on addressing the inefficiencies of traditional blockchain systems, Atto leverages a decentralized network to enable fast and secure transfers without the high energy consumption associated with many cryptocurrencies. Atto is committed to delivering a seamless user experience, making digital transactions accessible to everyone, regardless of technical expertise and pocket size.

This white paper details the technology behind Atto, its vision for the future of digital finance, and the unique approach it takes to solve the challenges faced by existing cryptocurrencies.

## Consensus

Atto uses an Open Representative Voting (ORV) consensus mechanism, to achieve a secure and efficient network. ORV leverages a system of representatives who are trusted by users to validate transactions and maintain the integrity of the ledger. This approach allows a colaborative and decentralized consensus without the need for energy-intensive mining, making it environmentally friendly and scalable.

### Open Representative Voting (ORV)

- **Delegated Trust**: In ORV, users can delegate their voting power to representatives. Representatives are nodes trusted by the community to vote for transactions and participate in consensus decisions.

- **Voting Weight Management**: Every node in the network keeps track of the maximum voting weight it observes over a rolling 7-day period. Representatives and all nodes use this information to determine when 65% of the maximum voting weight has been reached. To confirm a transaction, at least 65% of this maximum voting weight must be reached, ensuring protection against sybil attacks.

- **Security and Efficiency**: ORV provides a balance between decentralization and efficiency, as trusted representatives help streamline the consensus process while maintaining a high level of security and fault tolerance.

- **Incentive Structure**: Representatives are motivated to act in the best interests of the network because they are entrusted by users. Misbehaving representatives risk losing their delegated voting power, which incentivizes honest behavior.

- **Energy Efficiency**: Unlike Proof of Work consensus, ORV does not require energy-intensive calculations, making Atto highly efficient and sustainable for long-term use.

The ORV consensus mechanism allows Atto to achieve instant and feeless transactions, ensuring that the network remains accessible and effective for all users.



## Ledger Design

The Atto ledger uses a decentralized architecture where each account maintains its own chain of transactions, known as an 'account chain' model. In Atto, only the account holder can modify their account, including receiving funds. This design is key to enabling ORV consensus, as it eliminates global blockchain contention, limiting contention to individual accounts and allowing parallel and idependent transaction validation.\
&#x20;

### Account Chain Structure

- **Individual Chains**: Each account in Atto has its own blockchain, where every transaction is recorded as a block in that account's chain. This individualized structure eliminates the need for a single, shared chain, significantly increasing scalability and reducing congestion.

- **Parallel Processing**: Transactions are processed independently, allowing different users to initiate, propagate, and confirm transactions independently. This means that the entire network can handle multiple transactions simultaneously, except when originating from the same account.

- **Efficiency and Speed**: Since each account manages its own chain, there's no contention at the network level, allowing transactions to be validated and confirmed almost instantly.

## Blocks

Atto's ledger relies on a unique block structure designed to support its efficient, scalable, and decentralized model. Instead of a single, monolithic blockchain, Atto uses an 'account chain' model, where each account maintains its own chain of blocks. Each action, such as sending or receiving funds, is represented by a specific type of block.

We currently support only the Blake2b hashing algorithm along with Ed25519 for digital signatures, however blocks are designed to support other combinations.

### Open

The OPEN block is used to create a new account in the Atto network. It is the first block in an account's chain, initialized when the account receives its first funds. This block also sets up the representative for the account, which is crucial for participating in the ORV consensus. The OPEN block must reference the transaction hash from which the account is initially funded, ensuring a verifiable link to its origin.

#### Fields

- `network`: The network identifier that specifies the version of the protocol.

- `version`: The version of the block structure.

- `algorithm`: The cryptographic algorithm used for generating signatures.

- `publicKey`: The public key of the account holder.

- `balance`: The account balance after receiving the funds.

- `timestamp`: The time when the block was created.

- `sendHash`: The hash of the SEND block from which the initial funds originated.

- `representativePublicKey`: The public key of the representative chosen by the account holder.

### Send

The SEND block is used to send funds from an account to a recipient. It contains key information such as the amount of funds being transferred, the recipient's public key, and a reference to the previous block in the sender's chain. The SEND block reduces the balance of the sender's account and marks the transaction as pending until it is received by the recipient.

#### Fields

- `network`: The network identifier that specifies the version of the protocol.

- `version`: The version of the block structure.

- `algorithm`: The cryptographic algorithm used for generating signatures.

- `publicKey`: The public key of the sender's account.

- `height`: The height of the block in the account chain.

- `balance`: The account balance after the transaction.

- `timestamp`: The time when the block was created.

- `previous`: The hash of the previous block in the account chain.

- `receiverPublicKey`: The public key of the recipient.

- `amount`: The amount being sent.

### Receive

The RECEIVE block is used when an account receives funds from a SEND block. This block finalizes the transaction by adding the specified amount to the recipient's balance. RECEIVE blocks must reference the corresponding SEND block hash, ensuring that the transaction is accurately linked and preventing double-spending. The RECEIVE block also updates the account's height, incrementing it to reflect the new state.

#### Fields

- `network`: The network identifier that specifies the version of the protocol.

- `version`: The version of the block structure.

- `algorithm`: The cryptographic algorithm used for generating signatures.

- `publicKey`: The public key of the recipient's account.

- `height`: The height of the block in the account chain.

- `balance`: The account balance after receiving the funds.

- `timestamp`: The time when the block was created.

- `previous`: The hash of the previous block in the account chain.

- `sendHash`: The hash of the corresponding SEND block.

### Change

The CHANGE block allows an account holder to change their representative. Representatives play a critical role in the ORV consensus, and changing them may be necessary if the current representative becomes inactive or if the account holder prefers a different representative. The CHANGE block contains the new representative's public key and updates the account's metadata to reflect this change.

#### Fields

- `network`: The network identifier that specifies the version of the protocol.

- `version`: The version of the block structure.

- `algorithm`: The cryptographic algorithm used for generating signatures.

- `publicKey`: The public key of the account holder.

- `height`: The height of the block in the account chain.

- `balance`: The account balance at the time of the change.

- `timestamp`: The time when the block was created.

- `previous`: The hash of the previous block in the account chain.

- `representativePublicKey`: The public key of the new representative.

## Transaction

An Atto transaction represents the combination of a block, a digital signature, and Proof of Work (PoW) data. Each transaction encapsulates the necessary elements to maintain the integrity and authenticity of the Atto network, ensuring that transactions are valid, non-repudiable, and secure.

Transactions are fundamental to Atto's account chain model. Every transaction is created by generating a new block, which is then signed and validated. The combination of these elements ensures that only authorized users can modify their accounts, and that all network participants can verify the legitimacy of each action.

### Transaction Components

- **Block**: The core component of the transaction. It defines the specific action (e.g., SEND, RECEIVE, OPEN, CHANGE) performed by the account holder. The block data is integral to defining the change in the account state.
- **Signature**: The transaction is signed by the account holder's private key using Ed25519. The signature ensures that the transaction is authorized by the rightful owner of the account and that it cannot be tampered with after creation.
- **Work**: Proof of Work (PoW) is included to prevent spam. Although lightweight, it ensures that creating a transaction requires computational effort, deterring malicious actors from overwhelming the network with fraudulent transactions.



## Malicious Actors and Countermeasures

Atto incorporates a multitude of measures to safeguard its network from unnecessary traffic and ensure that nodes remain healthy by addressing different types of malicious actions and providing specific protections against them

### Dust Transaction

Dust transactions are low-value, high-frequency transactions designed to clog the network and degrade performance.

#### Countermeasures

- **Proof of Work**: Atto's minimal Proof of Work (PoW) mechanism for each transaction raises the cost and computational effort needed to initiate dust transactions, thus discouraging them by making spam uneconomical.
- **Bounded Queue**: Transactions are queued according to the number of decimals (up to 8). Low-value transactions compete in the lowest-priority queue. When a queue exceeds 1,000 transactions, the lowest priority transactions are removed.

### Transaction Replay

Transaction replay attacks occur when an attacker resubmits a valid transaction, aiming to repeat it without authorization.

#### Countermeasures

- **Hash Cache**: A cache with the latest transaction hash is kept in memory. If a transaction is already known, it will be rejected before being added to the prioritization queue.
- **Transaction Validation**: Each transaction must pass through multiple validation steps. A replayed transaction will fail the height validation since the account will have a higher height than the transaction, leading to its rejection as an outdated transaction.

### DDoS Protection

DDoS attacks involve overwhelming the network with excessive requests, aiming to disrupt normal operations and cause downtime.

#### Countermeasures

- **WebSocket Protocols**: Atto uses WebSocket protocols, which allow for the integration of advanced DDoS protection tools.

### Message Spam

Message spam occurs when nodes send an unusually high volume of messages to flood the network, potentially disrupting voting or transaction propagation.

#### Countermeasures

- **Frequency Analysis**: Atto evaluates the frequency of messages from each node, comparing them against the average traffic of voting nodes. Nodes exhibiting anomalously high message frequency are automatically blacklisted, protecting the network from targeted spam attacks.

### Pre-computed Transaction Spam

Pre-computed transactions are created in advance and set to execute in the future, allowing attackers to queue up spam transactions without immediate processing.

#### Countermeasures

- **Timestamp Validation**: Nodes accept transactions with a grace period of 1 minute. Any transaction with a timestamp beyond 1 minute will be rejected.
- **Priority Handling**: The prioritization logic considers transactions higher priority the closer they are to the current time. During a pre-computed attack, transactions with larger differences from the current time are deprioritized, reducing their impact.
- **Bounded Queue**: Transactions are queued according to the number of decimals (up to 8). Low-value transactions compete in the lowest-priority queue. When the queue exceeds 1,000 transactions, the lowest priority transactions are removed.

### Transaction Spam

Transaction spam involves sending a large number of transactions to overload the network and reduce performance for legitimate users.

#### Countermeasures

- **Bounded Queue**: Transactions are queued based on the number of decimals (up to 8). Low-value transactions compete in the lowest-priority queue. When the queue exceeds 1,000 transactions, the lowest priority transactions are removed to maintain network efficiency.
- **Transaction Prioritization Cache**: When an election is active for a transaction and a new transaction is received that links to one still in election mode, the node will cache it until the transaction is either saved or the election expires. If there is no active election (e.g., when a node is sending many transactions without waiting for confirmation), the transaction will be submitted  for validation, leading to its  rejection.
- **Frequency Analysis**: Atto evaluates the frequency of messages from each node, comparing them against the average traffic of voting nodes. Nodes exhibiting anomalously high message frequency are automatically blacklisted, protecting the network from targeted spam attacks.

## Acknowledgments

We wish to express our profound gratitude to those whose groundbreaking work has paved the way for innovations like Atto. Specifically, we acknowledge Satoshi Nakamoto, whose visionary Bitcoin protocol laid the cornerstone for modern cryptocurrencies, and Colin LeMahieu, whose development of Nano has heavily influenced Atto design to also achieving instant and efficient transactions. Their pioneering efforts have been invaluable in guiding the direction and values of our work.