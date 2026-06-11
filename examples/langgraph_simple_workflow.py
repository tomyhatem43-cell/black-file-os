# مثال تطبيقي: LangGraph Workflow بسيط لـ V6 CORE

from langgraph.graph import StateGraph, END
from typing import TypedDict

class V6State(TypedDict):
    topic: str
    script: str
    status: str

def research_agent(state):
    print("[Research Agent] Researching...")
    return {"script": f"Detailed script about {state['topic']}", "status": "research_done"}

def visual_agent(state):
    print("[Visual Agent] Generating visuals...")
    return {"status": "visual_done"}

def audio_agent(state):
    print("[Audio Agent] Processing audio...")
    return {"status": "audio_done"}

def editor_agent(state):
    print("[Editor Agent] Finalizing...")
    return {"status": "completed"}

def should_continue(state):
    if state["status"] == "completed":
        return END
    return "visual"

graph = StateGraph(V6State)
graph.add_node("research", research_agent)
graph.add_node("visual", visual_agent)
graph.add_node("audio", audio_agent)
graph.add_node("editor", editor_agent)

graph.set_entry_point("research")
graph.add_edge("research", "visual")
graph.add_edge("visual", "audio")
graph.add_edge("audio", "editor")
graph.add_conditional_edges("editor", should_continue)

app = graph.compile()

if __name__ == "__main__":
    result = app.invoke({"topic": "Ancient Egypt Psychology"})
    print("Final State:", result)