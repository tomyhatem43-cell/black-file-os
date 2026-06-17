# Phase 2: Collective Memory - Blackboard + Integration with MemoryManager (Fixed)

from typing import List, Dict, Optional
from datetime import datetime

class LongTermMemory:
    """Long-term memory from Phase 1 - included for completeness"""
    
    def __init__(self):
        self.knowledge_store: List[Dict] = []
    
    def retrieve_relevant(self, query: str, top_k: int = 5) -> List[Dict]:
        """Retrieve relevant knowledge for a query"""
        print(f"[LongTermMemory] Retrieving for: {query}")
        results = []
        for knowledge in self.knowledge_store:
            if query.lower() in str(knowledge).lower():
                results.append(knowledge)
        return results[:top_k] if results else [
            {"content": f"Knowledge about {query}", "score": 0.9},
            {"content": f"Best practices for {query}", "score": 0.85}
        ][:top_k]
    
    def store_experience(self, experience: Dict):
        """Store an experience"""
        self.knowledge_store.append(experience)
        print(f"[LongTermMemory] Stored experience for: {experience.get('task')}")

class Blackboard:
    """Collective memory system using blackboard pattern"""
    
    def __init__(self):
        self.posts: List[Dict] = []
        self.subscriptions: Dict[str, List[str]] = {}
        self.history: List[Dict] = []
    
    def post(self, agent_name: str, topic: str, content: str, post_type: str = "info") -> Dict:
        """Post to the blackboard"""
        if not agent_name or not topic or not content:
            raise ValueError("Agent name, topic, and content are required")
        
        post = {
            "agent": agent_name,
            "topic": topic,
            "content": content,
            "type": post_type,
            "timestamp": datetime.now().isoformat(),
            "id": f"{len(self.posts)}_{datetime.now().timestamp()}"
        }
        
        self.posts.append(post)
        self.history.append(post)
        print(f"[Blackboard] {agent_name} posted on '{topic}' [{post_type}]")
        
        # Notify subscribers
        if topic in self.subscriptions:
            for sub in self.subscriptions[topic]:
                if sub != agent_name:
                    print(f"  -> Notification sent to {sub}")
        
        return post
    
    def subscribe(self, agent_name: str, topic: str) -> bool:
        """Subscribe an agent to a topic"""
        if not agent_name or not topic:
            raise ValueError("Agent name and topic are required")
        
        if topic not in self.subscriptions:
            self.subscriptions[topic] = []
        
        if agent_name not in self.subscriptions[topic]:
            self.subscriptions[topic].append(agent_name)
            print(f"[Blackboard] {agent_name} subscribed to '{topic}'")
            return True
        return False
    
    def query(self, topic: Optional[str] = None, limit: int = 20) -> List[Dict]:
        """Query posts from the blackboard"""
        if topic:
            results = [p for p in self.posts if p["topic"] == topic]
            return results[-limit:]
        return self.posts[-limit:]
    
    def get_by_agent(self, agent_name: str) -> List[Dict]:
        """Get all posts from a specific agent"""
        return [p for p in self.posts if p["agent"] == agent_name]
    
    def clear_old_posts(self, limit: int = 100):
        """Keep only the most recent posts"""
        if len(self.posts) > limit:
            self.posts = self.posts[-limit:]
            print(f"[Blackboard] Cleared old posts, keeping {limit} most recent")

class MemoryManager:
    """Unified memory manager combining Phase 1 and Phase 2"""
    
    def __init__(self):
        self.long_term = LongTermMemory()
        self.blackboard = Blackboard()
    
    def prepare_context(self, state: dict) -> dict:
        """Prepare context from both long-term and blackboard memory"""
        # Get from Long-term Memory
        if state.get("current_task"):
            knowledge = self.long_term.retrieve_relevant(state["current_task"])
            state["context_from_long_term"] = knowledge
        
        # Also check Blackboard for recent collective updates
        recent_posts = self.blackboard.query(limit=5)
        if recent_posts:
            state["blackboard_context"] = recent_posts
        else:
            state["blackboard_context"] = []
        
        return state
    
    def post_to_collective(self, agent_name: str, topic: str, content: str) -> Dict:
        """Post to collective memory"""
        return self.blackboard.post(agent_name, topic, content)
    
    def subscribe_to_topic(self, agent_name: str, topic: str) -> bool:
        """Subscribe an agent to a topic"""
        return self.blackboard.subscribe(agent_name, topic)
    
    def save_result(self, state: dict):
        """Save result to long-term memory"""
        if state.get("final_output"):
            self.long_term.store_experience({
                "task": state.get("current_task"),
                "result": state.get("final_output"),
                "agents": state.get("active_agents", [])
            })
    
    def get_collective_memory_stats(self) -> Dict:
        """Get statistics about collective memory"""
        return {
            "total_posts": len(self.blackboard.posts),
            "subscriptions": {topic: len(agents) for topic, agents in self.blackboard.subscriptions.items()},
            "history_size": len(self.blackboard.history)
        }

if __name__ == "__main__":
    print("="*60)
    print("PHASE 2 - Blackboard Implementation Test")
    print("="*60)
    
    manager = MemoryManager()
    manager.subscribe_to_topic("Meta-Orchestrator", "coordination")
    manager.subscribe_to_topic("Performance-Optimizer", "coordination")
    manager.post_to_collective("Self-Balancer", "coordination", "High load detected on Performance Optimizer")
    manager.post_to_collective("Meta-Orchestrator", "coordination", "Initiating load balancing protocol")
    
    state = {"current_task": "Optimize agent coordination", "active_agents": ["Meta-Orchestrator"]}
    state = manager.prepare_context(state)
    state["final_output"] = "Coordination improved using collective memory."
    manager.save_result(state)
    
    print("\nCollective Memory Stats:")
    stats = manager.get_collective_memory_stats()
    for key, value in stats.items():
        print(f"  {key}: {value}")
    print("="*60)
