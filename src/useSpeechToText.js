import { useState, useRef } from "react";

export function useSpeechToText() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  const getRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    return recognition;
  };

  const start = () => {
    const recognition = getRecognition();
    if (!recognition) return;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setText((prev) => (prev + " " + transcript).trim());
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
      setListening(false);
    };

    recognition.onend = () => {
      // If user did not manually stop it, restart automatically
      if (listening) {
        recognition.start();
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const stop = () => {
    setListening(false);
    recognitionRef.current?.stop();
  };

  return { text, listening, start, stop };
}
