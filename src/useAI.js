import { useState } from "react";

export function useAI({
  provider = "openai",
  apiKey = "",
  model = "",
  baseUrl = ""
}) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const ask = async (message) => {
    setLoading(true);

    let url = "";
    let headers = { "Content-Type": "application/json" };
    let body = {};

    // -------------------------
    // PROVIDER ROUTING LOGIC
    // -------------------------

    switch (provider) {
      case "openai":
        url = `${baseUrl || "https://api.openai.com/v1"}/chat/completions`;
        headers.Authorization = `Bearer ${apiKey}`;
        body = {
          model: model || "gpt-4o-mini",
          messages: [{ role: "user", content: message }],
        };
        break;

      case "groq":
        url = `${baseUrl || "https://api.groq.com/openai/v1"}/chat/completions`;
        headers.Authorization = `Bearer ${apiKey}`;
        body = {
          model: model || "mixtral-8x7b-32768",
          messages: [{ role: "user", content: message }],
        };
        break;

      case "deepseek":
        url = `${baseUrl || "https://api.deepseek.com"}/v1/chat/completions`;
        headers.Authorization = `Bearer ${apiKey}`;
        body = {
          model: model || "deepseek-chat",
          messages: [{ role: "user", content: message }],
        };
        break;

      case "anthropic":
        url = `${baseUrl || "https://api.anthropic.com/v1"}/messages`;
        headers = {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        };
        body = {
          model: model || "claude-3-sonnet-20240229",
          messages: [{ role: "user", content: message }],
        };
        break;

      case "gemini":
        url = `${baseUrl || "https://generativelanguage.googleapis.com/v1beta/models"}/${model || "gemini-pro"}:generateContent?key=${apiKey}`;
        body = {
          contents: [{ parts: [{ text: message }] }]
        };
        break;

      case "ollama":
        url = `${baseUrl || "http://localhost:11434"}/api/chat`;
        body = {
          model: model || "llama3",
          messages: [{ role: "user", content: message }],
        };
        break;

      default:
        throw new Error("Unknown AI provider: " + provider);
    }

    // -------------------------
    // SEND REQUEST
    // -------------------------
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });

    const data = await res.json();

    // -------------------------
    // RESPONSE PARSING
    // -------------------------
    let text = "";

    switch (provider) {
      case "openai":
      case "groq":
      case "deepseek":
        text = data.choices?.[0]?.message?.content || "";
        break;
      
      case "anthropic":
        text = data.content?.[0]?.text || "";
        break;

      case "gemini":
        text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        break;

      case "ollama":
        text = data.message?.content || "";
        break;
    }

    setResponse(text);
    setLoading(false);
    return text;
  };

  return { ask, response, loading };
}
