# V6 Living Miracle - Basic Multi-Agent Orchestrator
# Uses MemoryManager + Blackboard from previous phases

class MetaOrchestrator:
    def __init__(self, memory_manager):
        self.memory = memory_manager
        self.agents = {}  # agent_name -> agent_instance

    def register_agent(self, name, agent_instance):
        self.agents[name] = agent_instance
        print(f"[Orchestrator] Registered agent: {name}")

    def run_task(self, task: str, selected_agents: list = None):
        print(f"\n[Orchestrator] Starting task: {task}")

        # Prepare context using memory system
        state = {
            "current_task": task,
            "messages": [{"role": "user", "content": task}],
            "active_agents": selected_agents or list(self.agents.keys()),
            "context_from_long_term": [],
            "blackboard_context": [],
            "iteration_count": 0
        }

        state = self.memory.prepare_context(state)

        # Simple sequential execution (can be upgraded to parallel/graph later)
        for agent_name in state["active_agents"]:
            if agent_name in self.agents:
                print(f"  -> Running {agent_name}...")
                # In real system: call agent.run(state)
                # For now, simulate
                state["iteration_count"] += 1

        # Finalize
        state["final_output"] = f"Task '{task}' completed by {len(state['active_agents'])} agents using shared memory."
        self.memory.save_result(state)

        return state


# Example usage
if __name__ == "__main__":
    from PHASE1_MEMORY_CORE_IMPLEMENTATION import MemoryManager

    memory = MemoryManager()
    orchestrator = MetaOrchestrator(memory)

    # Register some agents (placeholder)
    orchestrator.register_agent("Meta-Orchestrator", "placeholder")
    orchestrator.register_agent("Self-Balancer", "placeholder")
    orchestrator.register_agent("Innovation Generator", "placeholder")

    result = orchestrator.run_task("Improve system coordination using collective memory")
    print("\nFinal Output:", result["final_output"])