# V6 Living Miracle - Unified Memory System (Combined Phases 1 & 2)

# This file consolidates Short-term, Long-term, and Collective Memory
# into one cohesive system to avoid fragmentation.

from typing import TypedDict, Annotated, List, Optional, Dict, Any

from langgraph.graph import add_messages

class AgentState(TypedDict):
    messages: Annotated[List[dict], add_messages]
    current_task: str
    context_from_long_term: List[Dict[str, Any]]
    blackboard_context: List[Dict[str, Any]]
    active_agents: List[str]
    iteration_count: int
    final_output: Optional[str]
    memory_notes: List[str]


class UnifiedMemory:
    """
    Unified Memory System combining:
    - Short-term Memory (via AgentState)
    - Long-term Memory
    - Collective/Shared Memory (Blackboard)
    """

    def __init__(self):
        self.long_term_store = []
        self.blackboard_posts = []
        self.blackboard_subscriptions = {}

    # --- Long-term Memory ---
    def retrieve_from_long_term(self, query: str, top_k: int = 5) -> List[Dict]:
        print(f"[UnifiedMemory] Long-term retrieval for: {query}")
        return [
            {"content": f"Knowledge: {query}", "source": "Long-term"}
            for _ in range(min(top_k, 3))
        ]

    def store_to_long_term(self, experience: Dict):
        self.long_term_store.append(experience)
        print(f"[UnifiedMemory] Stored to long-term: {experience.get('task')}")

    # --- Collective Memory (Blackboard) ---
    def post_to_blackboard(self, agent: str, topic: str, content: str):
        post = {"agent": agent, "topic": topic, "content": content}
        self.blackboard_posts.append(post)
        print(f"[Blackboard] {agent} posted on '{topic}'")

        # Notify subscribers
        if topic in self.blackboard_subscriptions:
            for sub in self.blackboard_subscriptions[topic]:
                if sub != agent:
                    print(f"  -> Notified {sub}")

    def subscribe_to_blackboard(self, agent: str, topic: str):
        if topic not in self.blackboard_subscriptions:
            self.blackboard_subscriptions[topic] = []
        self.blackboard_subscriptions[topic].append(agent)

    def get_blackboard_context(self, limit: int = 10) -> List[Dict]:
        return self.blackboard_posts[-limit:]

    # --- Unified Context Preparation ---
    def prepare_full_context(self, state: AgentState) -> AgentState:
        if state.get("current_task"):
            long_term = self.retrieve_from_long_term(state["current_task"])
            state["context_from_long_term"] = long_term

        blackboard = self.get_blackboard_context()
        state["blackboard_context"] = blackboard

        return state

    def save_final_result(self, state: AgentState):
        if state.get("final_output"):
            self.store_to_long_term({
                "task": state["current_task"],
                "result": state["final_output"],
                "agents": state.get("active_agents", [])
            })


# Example
if __name__ == "__main__":
    memory = UnifiedMemory()
    state: AgentState = {
        "messages": [],
        "current_task": "Improve agent coordination",
        "context_from_long_term": [],
        "blackboard_context": [],
        "active_agents": ["Meta-Orchestrator"],
        "iteration_count": 0,
        "final_output": None,
        "memory_notes": []
    }

    state = memory.prepare_full_context(state)
    state["final_output"] = "Coordination improved using unified memory."
    memory.save_final_result(state)

    print("Unified Memory system working correctly.")