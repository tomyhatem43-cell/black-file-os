# Phase 2: Collective/Shared Memory (Blackboard Architecture)

## Objective
Enable true collective intelligence by allowing all meta-agents to read from and contribute to a shared memory space.

## Concept: Blackboard Architecture
- A central shared space where agents post information, hypotheses, and results.
- Agents can read relevant information posted by others.
- Supports emergent collaboration and problem-solving.

## Key Components

1. **Blackboard Store**
   - Central repository for shared knowledge.
   - Structured with topics/categories for easy retrieval.

2. **Access Control & Permissions**
   - Agents have different read/write permissions based on their role.

3. **Notification/Trigger System**
   - Agents can subscribe to certain topics and get notified when new information is posted.

## Implementation Approach

- Use a combination of:
  - In-memory store (for fast access during a session)
  - Persistent store (Vector DB + Knowledge Graph)

- Each agent can:
  - Post to the blackboard
  - Query the blackboard for relevant information
  - React to new posts from other agents

## Benefits for V6
- Dramatically improves coordination between the 12 meta-agents.
- Enables emergent behavior and collective problem-solving.
- Supports the "Living" nature of the Miracle Organism.

## Next Steps
- Design the data model for the Blackboard.
- Implement basic post/query functions.
- Integrate with existing MemoryManager.