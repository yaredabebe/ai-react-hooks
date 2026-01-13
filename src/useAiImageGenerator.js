import { useState } from "react";

export function useAiImageGenerator(
  apiKey,
  { baseUrl = "https://api.openai.com/v1", model = "gpt-image-1" } = {}
) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async (prompt) => {
    setLoading(true);
    setImageUrl("");

    try {
      const isOllama = baseUrl.includes("localhost");

      const headers = {
        "Content-Type": "application/json",
      };

      // Only attach auth header for OpenAI
      if (!isOllama && apiKey !== "none") {
        headers.Authorization = `Bearer ${apiKey}`;
      }

      const body = isOllama
        ? JSON.stringify({
            model,
            prompt,
          })
        : JSON.stringify({
            model,
            prompt,
            size: "1024x1024",
          });

      const res = await fetch(`${baseUrl}/images/generations`, {
        method: "POST",
        headers,
        body,
      });

      if (!res.ok) {
        throw new Error("Image generation failed");
      }

      const data = await res.json();

      let finalImageUrl = "";

      if (isOllama) {
        // For Ollama → image is Base64
        const base64 = data?.image || data?.images?.[0];
        if (base64) finalImageUrl = `data:image/png;base64,${base64}`;
      } else {
        // For OpenAI → image URL
        finalImageUrl = data?.data?.[0]?.url || "";
      }

      setImageUrl(finalImageUrl);
      setLoading(false);

      return finalImageUrl;
    } catch (err) {
      console.error("Image generation error:", err);
      setLoading(false);
      return "";
    }
  };

  return { generate, imageUrl, loading };
}
