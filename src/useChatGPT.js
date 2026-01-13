import { useState } from "react";

export function useChatGPT({
  apiKey,
  baseUrl = "https://api.openai.com/v1",
  model = "gpt-4o-mini",
}) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const ask = async (message) => {
    setLoading(true);

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await res.json();

    const text = data?.choices?.[0]?.message?.content || "No response";

    setResponse(text);
    setLoading(false);

    return text;
  };

  return { ask, response, loading };
}
