# Phase 2: Collective/Shared Memory - Blackboard Implementation

class Blackboard:
    """
    Simple Blackboard for Collective/Shared Memory between meta-agents.
    Agents can post information and query relevant posts.
    """

    def __init__(self):
        self.posts = []  # List of posts: {agent, topic, content, timestamp}

    def post(self, agent_name: str, topic: str, content: str):
        post = {
            "agent": agent_name,
            "topic": topic,
            "content": content,
            "timestamp": "2026-06-12"
        }
        self.posts.append(post)
        print(f"[Blackboard] {agent_name} posted on topic '{topic}'")

    def query(self, topic: str = None, limit: int = 10) -> list:
        if topic:
            results = [p for p in self.posts if p["topic"] == topic]
        else:
            results = self.posts
        return results[-limit:]

    def get_all_topics(self) -> list:
        return list(set(p["topic"] for p in self.posts))


# Example Usage
if __name__ == "__main__":
    bb = Blackboard()

    bb.post("Meta-Orchestrator", "coordination", "Need better task distribution")
    bb.post("Self-Balancer", "stability", "System load is increasing")
    bb.post("Innovation Generator", "coordination", "Idea: Use shared memory for collaboration")

    print("\nPosts about coordination:")
    for post in bb.query(topic="coordination"):
        print(post)

    print("\nAll topics:", bb.get_all_topics())