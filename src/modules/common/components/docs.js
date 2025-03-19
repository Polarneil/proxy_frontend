import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../css/docs.css';

function DocsPopup({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('python');

  const docsContent = {
    python: `
## Python Example

\`\`\`python
import requests

LITELLM_API_BASE = "http://0.0.0.0:4000"
VIRTUAL_TOKEN = "your_generated_token"

def chat_completion(messages, model="gpt-4o"):
    """Sends a chat completion request to the LiteLLM proxy using a virtual token."""

    headers = {
        "Authorization": f"Bearer {VIRTUAL_TOKEN}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "messages": messages,
    }

    try:
        response = requests.post(
            f"{LITELLM_API_BASE}/chat/completions", headers=headers, json=payload
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error making API request: {e}")
        if response is not None:
            print(f"Response content: {response.content}")
        return None

# Example usage
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is the capital of France?"},
]

response_data = chat_completion(messages)

if response_data:
    try:
        print(response_data["choices"][0]["message"]["content"])
    except (KeyError, IndexError, TypeError) as e:
        print(f"Error parsing response: {e}")
        print(f"Raw response data: {response_data}")
\`\`\`
`,
    crewai: `
## CrewAI Example

\`\`\`python
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
\`\`\`
`,
    // Add more languages/examples here
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="docs-popup-container">
        <div className="docs-popup-header">
          <div className="docs-popup-tabs">
            <button
              className={`docs-popup-tab ${activeTab === 'python' ? 'active' : ''}`}
              onClick={() => setActiveTab('python')}
            >
              Getting Started
            </button>
            <button
              className={`docs-popup-tab ${activeTab === 'crewai' ? 'active' : ''}`}
              onClick={() => setActiveTab('crewai')}
            >
              CrewAI
            </button>
            {/* Add more tabs here */}
          </div>
          <button onClick={onClose} className="docs-popup-close-button">
            &times;
          </button>
        </div>
        <div className="docs-popup-content">
          <ReactMarkdown
            children={docsContent[activeTab]}
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
      <div className="docs-popup-overlay" onClick={onClose}></div>
    </>
  );
}

export default DocsPopup;
