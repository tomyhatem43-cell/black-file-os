# Phase 1: Short-term + Long-term Memory Implementation

## Objective
Build the foundational memory system for V6 meta-agents.

## 1. Short-term Memory (Working Memory)

### Implementation Approach
- Use **LangGraph State** as the primary mechanism.
- Store:
  - Current task/goal
  - Recent conversation history
  - Intermediate results from other agents
  - Current context from Long-term Memory

### Recommended Structure (Python + LangGraph)
```python
class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    current_task: str
    context_from_long_term: list[str]
    active_agents: list[str]
    iteration_count: int
```

## 2. Long-term Memory

### Components
- **Vector Store**: For semantic retrieval (documents, past decisions, knowledge).
- **Metadata Filtering**: Filter by agent type, timestamp, relevance, etc.

### Recommended Setup
- Use **Weaviate** or **PGVector**.
- Store embeddings of:
  - Project documentation
  - Past execution results
  - Agent reflections
  - User interactions

## 3. Integration Flow

1. Agent receives a task.
2. Short-term Memory loads recent context.
3. Agent queries Long-term Memory for relevant knowledge.
4. Retrieved knowledge is injected into Short-term Memory.
5. Agent performs its function.
6. Results are optionally stored back into Long-term Memory.

## 4. Next Actions
- Set up LangGraph State schema.
- Initialize Vector Store connection.
- Create basic retrieval function.
- Integrate with existing Meta-Orchestrator.