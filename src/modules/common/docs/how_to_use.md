```python
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
```