# V6 Living Miracle - Enhanced MetaOrchestrator with Blackboard Integration (Fixed)

from typing import Dict, List, Optional, Any
from datetime import datetime

class Agent:
    """Base agent class"""
    
    def __init__(self, name: str, role: str = "generic"):
        self.name = name
        self.role = role
        self.task_history = []
        self.last_executed = None
    
    def execute(self, task: str) -> str:
        """Execute a task and return result"""
        result = f"{self.name} executed: {task}"
        self.task_history.append({
            "task": task,
            "timestamp": datetime.now().isoformat(),
            "result": result
        })
        self.last_executed = datetime.now()
        return result
    
    def get_status(self) -> Dict:
        """Get agent status"""
        return {
            "name": self.name,
            "role": self.role,
            "tasks_executed": len(self.task_history),
            "last_executed": self.last_executed.isoformat() if self.last_executed else None
        }

class MetaOrchestrator:
    """Enhanced orchestrator with memory and blackboard integration"""
    
    def __init__(self, memory_manager):
        self.memory = memory_manager
        self.agents: Dict[str, Agent] = {}
        self.task_log: List[Dict] = []
        self.state_history: List[Dict] = []

    def register_agent(self, name: str, agent: Optional[Agent] = None) -> bool:
        """Register an agent with the orchestrator"""
        if not name:
            raise ValueError("Agent name is required")
        
        if agent is None:
            agent = Agent(name)
        
        self.agents[name] = agent
        print(f"[Orchestrator] Registered agent: {name}")
        return True

    def deregister_agent(self, name: str) -> bool:
        """Deregister an agent"""
        if name in self.agents:
            del self.agents[name]
            print(f"[Orchestrator] Deregistered agent: {name}")
            return True
        return False

    def run_task(self, task: str, agents_to_use: Optional[List[str]] = None) -> Dict:
        """Run a task with multiple agents using collective memory"""
        print(f"\n[Orchestrator] Starting task: {task}")
        
        state = {
            "current_task": task,
            "messages": [{"role": "user", "content": task}],
            "active_agents": agents_to_use or list(self.agents.keys()),
            "context_from_long_term": [],
            "blackboard_context": [],
            "iteration_count": 0,
            "final_output": None,
            "agent_results": {},
            "timestamps": {
                "start": datetime.now().isoformat()
            }
        }

        # Validate agents exist
        for agent_name in state["active_agents"]:
            if agent_name not in self.agents:
                print(f"[Warning] Agent {agent_name} not found")
                state["active_agents"].remove(agent_name)

        # Enrich with memory (Long-term + Blackboard)
        state = self.memory.prepare_context(state)

        # Multi-iteration loop
        max_iterations = 3
        for i in range(max_iterations):
            state["iteration_count"] = i + 1
            print(f"  Iteration {i+1}/{max_iterations}")

            for agent_name in state["active_agents"]:
                if agent_name in self.agents:
                    agent = self.agents[agent_name]
                    print(f"    -> {agent_name} working...")
                    
                    # Execute agent task
                    result = agent.execute(task)
                    state["agent_results"][agent_name] = result
                    
                    # Post progress to collective memory
                    self.memory.post_to_collective(
                        agent_name, 
                        "task_progress", 
                        f"{agent_name} completed step {i+1}"
                    )

        state["final_output"] = f"Task completed after {max_iterations} iterations using collective memory."
        state["timestamps"]["end"] = datetime.now().isoformat()
        
        # Save result to memory
        self.memory.save_result(state)
        self.task_log.append(state)
        self.state_history.append(state)

        return state

    def get_orchestrator_status(self) -> Dict:
        """Get orchestrator status"""
        return {
            "total_agents": len(self.agents),
            "agents": [agent.get_status() for agent in self.agents.values()],
            "tasks_executed": len(self.task_log),
            "state_history_size": len(self.state_history)
        }

    def get_collective_intelligence(self) -> Dict:
        """Get collective intelligence from all agents"""
        collective = {
            "memory_stats": self.memory.get_collective_memory_stats(),
            "orchestrator_stats": self.get_orchestrator_status()
        }
        return collective

# Quick integration test
if __name__ == "__main__":
    # Import memory manager
    from PHASE2_BLACKBOARD_IMPLEMENTATION import MemoryManager
    
    print("="*60)
    print("V6 Living Miracle - MetaOrchestrator Test")
    print("="*60)
    
    # Initialize memory and orchestrator
    memory = MemoryManager()
    orchestrator = MetaOrchestrator(memory)

    # Register agents
    orchestrator.register_agent("Meta-Orchestrator", Agent("Meta-Orchestrator", "coordinator"))
    orchestrator.register_agent("Self-Balancer", Agent("Self-Balancer", "balancer"))
    orchestrator.register_agent("Performance-Optimizer", Agent("Performance-Optimizer", "optimizer"))

    # Subscribe agents to collective memory topics
    memory.subscribe_to_topic("Meta-Orchestrator", "task_progress")
    memory.subscribe_to_topic("Self-Balancer", "task_progress")
    memory.subscribe_to_topic("Performance-Optimizer", "task_progress")

    # Run a task
    result = orchestrator.run_task(
        "Optimize coordination between agents using shared memory",
        ["Meta-Orchestrator", "Self-Balancer"]
    )
    
    print("\n" + "="*60)
    print("Task Result:")
    print("="*60)
    print(f"Final Output: {result['final_output']}")
    print(f"Iterations: {result['iteration_count']}")
    print(f"Agent Results: {result['agent_results']}")
    
    print("\n" + "="*60)
    print("Collective Intelligence:")
    print("="*60)
    collective = orchestrator.get_collective_intelligence()
    print(f"Agents Count: {collective['orchestrator_stats']['total_agents']}")
    print(f"Tasks Executed: {collective['orchestrator_stats']['tasks_executed']}")
    print(f"Collective Memory Posts: {collective['memory_stats']['total_posts']}")
    print("="*60)
