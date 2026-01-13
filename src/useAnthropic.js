import { useState } from "react";

export function useAnthropic(apiKey, model = "claude-3.5-sonnet") {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const ask = async (message) => {
    setLoading(true);

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await res.json();

    const text =
      data?.content?.[0]?.text ||
      data?.content?.[0]?.content ||
      "No response";

    setResponse(text);
    setLoading(false);

    return text;
  };

  return { ask, response, loading };
}
