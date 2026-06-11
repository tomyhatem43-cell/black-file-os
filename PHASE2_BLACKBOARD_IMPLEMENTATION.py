# Phase 2: Advanced Collective/Shared Memory - Blackboard (Enhanced)

class Blackboard:
    """
    Advanced Blackboard for Collective Memory between meta-agents.
    Supports posting, querying, subscriptions, and notifications.
    """

    def __init__(self):
        self.posts = []
        self.subscriptions = {}  # topic -> list of agents

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

        # Notify subscribed agents
        if topic in self.subscriptions:
            for subscriber in self.subscriptions[topic]:
                if subscriber != agent_name:
                    print(f"  -> Notifying {subscriber} about new post on '{topic}'")

    def subscribe(self, agent_name: str, topic: str):
        if topic not in self.subscriptions:
            self.subscriptions[topic] = []
        if agent_name not in self.subscriptions[topic]:
            self.subscriptions[topic].append(agent_name)
            print(f"[Blackboard] {agent_name} subscribed to '{topic}'")

    def query(self, topic: str = None, post_type: str = None, limit: int = 20):
        results = self.posts
        if topic:
            results = [p for p in results if p["topic"] == topic]
        if post_type:
            results = [p for p in results if p["type"] == post_type]
        return results[-limit:]

    def get_topics(self):
        return list(set(p["topic"] for p in self.posts))


# Example: Multiple agents using the Blackboard
if __name__ == "__main__":
    bb = Blackboard()

    # Subscriptions
    bb.subscribe("Meta-Orchestrator", "coordination")
    bb.subscribe("Self-Balancer", "coordination")
    bb.subscribe("Innovation Generator", "ideas")

    # Posts
    bb.post("Meta-Orchestrator", "coordination", "Need better task distribution between agents", "request")
    bb.post("Self-Balancer", "coordination", "Current load is high on Performance Optimizer", "status")
    bb.post("Innovation Generator", "ideas", "Proposal: Use shared memory for real-time collaboration", "proposal")

    print("\n--- Coordination Posts ---")
    for post in bb.query(topic="coordination"):
        print(post)

    print("\n--- All Topics ---")
    print(bb.get_topics())