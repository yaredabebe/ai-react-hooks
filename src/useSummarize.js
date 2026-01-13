import { useState } from "react";

export function useSummarize({
  apiKey = "none",
  baseUrl = "https://api.openai.com/v1",
  model = "gpt-4o-mini" // default OpenAI model
} = {}) {

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarize = async (text) => {
    setLoading(true);

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey !== "none" ? { Authorization: `Bearer ${apiKey}` } : {})
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "Summarize the following text." },
          { role: "user", content: text }
        ],
      }),
    });

    const data = await res.json();
    const result = data.choices?.[0]?.message?.content || "";
    setSummary(result);
    setLoading(false);
    return result;
  };

  return { summarize, summary, loading };
}
