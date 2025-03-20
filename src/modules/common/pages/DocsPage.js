import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../css/docs.css';

function DocsPage() {
    const beginnerExample = `
# LLM API Key Vending Machine - User Guide

This guide shows how to use virtual API keys from our internal LLM API Key Vending Machine, which uses LiteLLM to access Azure OpenAI.

## Getting Started

1.  **Get a Key:** Obtain a virtual API key from the vending machine.
2.  **Install Requests:** \`pip install requests\`

## Base URL

Use this base URL for API requests:

\`\`\`
http://0.0.0.0:4000
\`\`\`

**Note:** Verify the correct URL with your system administrator.

## Authentication

Use your key in the \`Authorization\` header: \`Bearer your_generated_token\`.

## Python Example

\`\`\`python
import requests

LITELLM_API_BASE = "http://0.0.0.0:4000"
VIRTUAL_TOKEN = "your_generated_token"

def chat_completion(messages, model="gpt-4o"):
    headers = {"Authorization": f"Bearer {VIRTUAL_TOKEN}", "Content-Type": "application/json"}
    payload = {"model": model, "messages": messages}
    try:
        response = requests.post(f"{LITELLM_API_BASE}/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}, Response: {response.content if response else None}")
        return None

messages = [{"role": "system", "content": "You are helpful."}, {"role": "user", "content": "Hello?"}]
response = chat_completion(messages)

if response:
    try:
        print(response["choices"][0]["message"]["content"])
    except (KeyError, IndexError, TypeError) as e:
        print(f"Parse Error: {e}, Raw: {response}")
\`\`\`

## Key Points

* **Replace placeholders:** Update \`VIRTUAL_TOKEN\` with your token.
* **Error handling:** The code includes basic error checks.
* **Model selection:** Change \`model\` to use other allowed models.
* **Security:** Keep your API key safe.
`;

    const crewaiExample = `
# CrewAI Integration Example

This example demonstrates how to integrate the LLM API Key Vending Machine with CrewAI.

## Getting Started

1.  **Install CrewAI:** \`pip install crewai\`
2.  **Obtain a Key:** Get a virtual API key from the vending machine.
3.  **Use the Base URL:** Ensure you are using the correct base URL (e.g., \`http://0.0.0.0:4000\`).

## Python Example

\`\`\`python
from crewai import Agent, LLM

class WriterAgent:
    def __init__(self, api_key):
        self.CrederaProxy = LLM(
            model="gpt-4o",
            base_url="http://0.0.0.0:4000",
            api_key=api_key
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

# Replace 'your_generated_token' with your actual API key
api_key = "your_generated_token"
writer = WriterAgent(api_key).writer_agent()

# Example usage (you'll need to set up a task and crew to fully utilize this agent)
# ...
\`\`\`

## Key Points

* **API Key Integration:** The virtual API key is passed to the \`LLM\` class in CrewAI.
* **Base URL Configuration:** The \`base_url\` parameter is set to the vending machine's URL.
* **Agent Creation:** The \`WriterAgent\` class demonstrates how to create a CrewAI agent using the virtual API key.
* **Replace Placeholder:** Update \`your_generated_token\` with your actual API key.
* **Complete Crew Setup:** This example shows agent creation; you will need to add task and crew definitions to fully utilize CrewAI.
`;

    return (
        <div className="docs-page-container">
            <div className="beginner-example">
                <div className="markdown-text">
                    <ReactMarkdown
                        children={beginnerExample}
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        style={tomorrow}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    />
                </div>
            </div>

            <div className="crewai-example">
                <div className="markdown-text">
                    <ReactMarkdown
                        children={crewaiExample}
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        style={tomorrow}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default DocsPage;