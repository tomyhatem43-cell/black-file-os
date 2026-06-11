# V6 Living Miracle - Enhanced MetaOrchestrator with Blackboard Integration

class MetaOrchestrator:
    def __init__(self, memory_manager):
        self.memory = memory_manager
        self.agents = {}

    def register_agent(self, name, agent):
        self.agents[name] = agent

    def run_task(self, task: str, agents_to_use: list = None):
        print(f"\n[Orchestrator] Starting task: {task}")

        state = {
            "current_task": task,
            "messages": [{"role": "user", "content": task}],
            "active_agents": agents_to_use or list(self.agents.keys()),
            "context_from_long_term": [],
            "blackboard_context": [],
            "iteration_count": 0,
            "final_output": None
        }

        # Enrich with memory (Long-term + Blackboard)
        state = self.memory.prepare_context(state)

        # Simple multi-iteration loop (can be replaced with LangGraph later)
        max_iterations = 3
        for i in range(max_iterations):
            state["iteration_count"] = i + 1
            print(f"  Iteration {i+1}/{max_iterations}")

            for agent_name in state["active_agents"]:
                if agent_name in self.agents:
                    print(f"    -> {agent_name} working...")
                    # Simulate agent work + posting to Blackboard
                    self.memory.post_to_collective(
                        agent_name, 
                        "task_progress", 
                        f"{agent_name} completed step {i+1}"
                    )

        state["final_output"] = f"Task completed after {max_iterations} iterations using collective memory."
        self.memory.save_result(state)

        return state


# Quick test
if __name__ == "__main__":
    from PHASE1_MEMORY_CORE_IMPLEMENTATION import MemoryManager

    memory = MemoryManager()
    orchestrator = MetaOrchestrator(memory)

    orchestrator.register_agent("Meta-Orchestrator", object())
    orchestrator.register_agent("Self-Balancer", object())

    result = orchestrator.run_task("Optimize coordination between agents using shared memory")
    print("\nResult:", result["final_output"])