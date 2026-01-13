import { useState } from "react";

export function useOllama({
  model = "llama3",
  baseUrl = "http://localhost:11434"
}) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const ask = async (message) => {
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: message }],
        }),
      });

      const data = await res.json();

      const text =
        data?.message?.content ||
        data?.messages?.[0]?.content ||
        "No response";

      setResponse(text);
      setLoading(false);
      return text;
    } catch (err) {
      setResponse("Error: " + err.message);
      setLoading(false);
    }
  };

  return { ask, response, loading };
}
