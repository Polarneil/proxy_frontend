```python
from crewai import Agent, LLM


class WriterAgent:
    def __init__(self):
        self.CrederaProxy = LLM(
            model="gpt-4o",
            base_url="http://0.0.0.0:4000",
            api_key="your_generated_token"
        )

    def writer_agent(self):
        return Agent(
            role="Technical Writer",
            backstory="You are an experienced technical writer with a passion for simplifying complex information.",
            goal="Create clear and concise documentation.",
            allow_delegation=False,
            verbose=True,
            llm=self.CrederaProxy,
        )
```