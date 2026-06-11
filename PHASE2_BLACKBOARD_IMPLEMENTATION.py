# Phase 2: Collective Memory - Blackboard + Integration with MemoryManager

class Blackboard:
    def __init__(self):
        self.posts = []
        self.subscriptions = {}

    def post(self, agent_name: str, topic: str, content: str, post_type: str = "info"):
        post = {
            "agent": agent_name,
            "topic": topic,
            "content": content,
            "type": post_type,
            "timestamp": "2026-06-12"
        }
        self.posts.append(post)
        print(f"[Blackboard] {agent_name} posted on '{topic}' [{post_type}]")

        if topic in self.subscriptions:
            for sub in self.subscriptions[topic]:
                if sub != agent_name:
                    print(f"  -> Notification sent to {sub}")

    def subscribe(self, agent_name: str, topic: str):
        if topic not in self.subscriptions:
            self.subscriptions[topic] = []
        if agent_name not in self.subscriptions[topic]:
            self.subscriptions[topic].append(agent_name)

    def query(self, topic: str = None, limit: int = 20):
        if topic:
            return [p for p in self.posts if p["topic"] == topic][-limit:]
        return self.posts[-limit:]


class MemoryManager:
    def __init__(self):
        self.long_term = LongTermMemory()  # From Phase 1
        self.blackboard = Blackboard()     # Phase 2

    def prepare_context(self, state):
        # Get from Long-term Memory
        if state.get("current_task"):
            knowledge = self.long_term.retrieve_relevant(state["current_task"])
            state["context_from_long_term"] = knowledge

        # Also check Blackboard for recent collective updates
        recent_posts = self.blackboard.query(limit=5)
        if recent_posts:
            state["blackboard_context"] = recent_posts
        return state

    def post_to_collective(self, agent_name, topic, content):
        self.blackboard.post(agent_name, topic, content)

    def subscribe_to_topic(self, agent_name, topic):
        self.blackboard.subscribe(agent_name, topic)


# Example of integration
if __name__ == "__main__":
    manager = MemoryManager()

    # Agent subscribes to coordination topic
    manager.subscribe_to_topic("Meta-Orchestrator", "coordination")

    # Agent posts to collective memory
    manager.post_to_collective("Self-Balancer", "coordination", "High load detected on Performance Optimizer")

    # Another agent prepares context (will see the post)
    state = {"current_task": "Optimize agent coordination"}
    state = manager.prepare_context(state)

    print("\nContext prepared with both Long-term and Collective memory.")