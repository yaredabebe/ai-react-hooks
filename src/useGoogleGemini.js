import { useState } from "react";

export function useGoogleGemini(apiKey, model = "gemini-1.5-flash") {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const ask = async (message) => {
    setLoading(true);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    setResponse(text);
    setLoading(false);

    return text;
  };

  return { ask, response, loading };
}
