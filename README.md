# ai-react-hooks 🤖

 


<div  align="center">

  


[![npm version](https://img.shields.io/npm/v/ai-react-hooks.svg)](https://www.npmjs.com/package/ai-react-hooks)

 

[![npm downloads](https://img.shields.io/npm/dm/ai-react-hooks.svg)](https://www.npmjs.com/package/ai-react-hooks)

 

[![bundle size](https://img.shields.io/bundlephobia/minzip/ai-react-hooks)](https://bundlephobia.com/package/ai-react-hooks)

  
[![license](https://img.shields.io/npm/l/ai-react-hooks.svg)](https://github.com/yaredabebe/ai-react-hooks/blob/main/LICENSE)

  
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)



**A collection of React hooks for seamless AI integration across multiple providers**

 


</div>

---


## ✨ Features

  

  

-  **Unified API**: Single hook (`useAI`) for all providers

  

-  **Multi-Provider**: OpenAI, Anthropic, Google Gemini, Ollama, Groq, DeepSeek

  

-  **Feature-Rich**: Chat, image generation, speech-to-text, summarization

  

-  **TypeScript**: Full type safety and IntelliSense support


-  **Lightweight**: Zero dependencies, tree-shakeable

  

-  **React 18+**: Built for modern React applications

  

  

## 📦 Installation

  

#### Install using your preferred package manager.

### npm

```bash
npm  install  ai-react-hooks
```
### yarn
```bash
yarn  add  ai-react-hooks
```

### pnpm
```bash
pnpm  add  ai-react-hooks
```

🚀 Quick Start

 
### Basic Usage

```jsx

import { useAI } from  "ai-react-hooks";

function  ChatComponent() {

const { ask, response, loading, error } = useAI({

provider:  "openai", // "ollama", "groq", "deepseek", etc.

apiKey:  process.env.OPENAI_API_KEY,

model:  "gpt-4o-mini",
});


const  handleClick = () => {

ask("Explain quantum computing in simple terms");

};

return (

<div>

<button  onClick={handleClick}  disabled={loading}>

{loading ? "Thinking..." : "Ask AI"}

</button>

{response && <p>{response}</p>}

  

{error && <p  className="error">Error: {error.message}</p>}

  

</div>


);

  

}

```

  

### 🎯 Available Hooks

Hook | Provider | Description
---- | -------- | -----------
useAI | All Providers | Unified hook for any AI provider
useChatGPT | OpenAI | GPT-4, GPT-4o, GPT-3.5
useAnthropic | Anthropic | Claude 3, Claude Instant
useGoogleGemini | Google | Gemini Pro, Gemini Flash
useOllama | Ollama | Local models (Llama, Mistral)
useGroq | Groq | Ultra-fast LLM inference
useDeepSeek | DeepSeek | DeepSeek models
useSummarize | Text Processing | Text summarization
useAiImageGenerator | Image Generation | DALL·E, Stable Diffusion
useSpeechToText | Browser API | Web Speech API integration

  

## 📖 Examples

  

### 1. Chat with OpenAI

  

```jsx

import { useChatGPT } from  "ai-react-hooks";

function  OpenAIChat() {

const { ask, response, loading } = useChatGPT({

apiKey:  "your-openai-key",

model:  "gpt-4",

temperature:  0.7,
});

return (

<div>

<button  onClick={() =>  ask("Write a poem about React hooks")}>

Generate Poem

</button>

{loading && <span>Thinking...</span>}

{response && <p>{response}</p>}

</div>

);

}
```

  

### 2. Image Generation

```jsx

import { useAiImageGenerator } from  "ai-react-hooks";

function  ImageGenerator() {
const { generate, imageUrl, loading } = useAiImageGenerator({

provider:  "openai",

apiKey:  process.env.OPENAI_API_KEY,

size:  "1024x1024",

});
return (

<div>

<input

placeholder="Describe an image..."

onKeyPress={(e) =>  e.key === 'Enter' && generate(e.target.value)}
/>

{loading && <p>Generating...</p>}

{imageUrl && <img  src={imageUrl}  alt="Generated"  />}

</div>

)


```

  

### 3. Speech to Text

```jsx
import { useSpeechToText } from  "ai-react-hooks";

function  VoiceInput() {

const { start, stop, text, listening } = useSpeechToText({

continuous:  true,

language:  "en-US",


});

return (

<div>

<button  onClick={listening ? stop : start}>

{listening ? "Stop Recording" : "Start Recording"}

</button>

<p>{text || "Speak to see transcription..."}</p>

</div>

);

}

```



### 🔧 Configuration

  

Environment Setup

  
### .env.local
```bash
OPENAI_API_KEY=sk-...

ANTHROPIC_API_KEY=sk-ant-...

GOOGLE_AI_API_KEY=AIza...

```

  

### Provider Configuration

```jsx

// OpenAI

const  openAI = useChatGPT({

apiKey:  "your-key",

model:  "gpt-4",

temperature:  0.7,
maxTokens:  1000,

});


// Anthropic

  

const  anthropic = useAnthropic({

apiKey:  "your-key",

model:  "claude-3-opus-20240229",

maxTokens:  1000,

});


// Ollama (Local)

  

const  ollama = useOllama({

baseUrl:  "http://localhost:11434",

model:  "llama2",

});

  

```

  

### 📚 API Reference

#### Common Props

Prop | Type | Description
---- | ---- | -----------
apiKey | string | Provider API key
model | string | Model identifier
temperature | number | Creativity level (0–1)
maxTokens | number | Maximum response length

#### Hook Return Values

All hooks return an object with:

Property | Type | Description
-------- | ---- | -----------
ask / generate | Function | Trigger AI request
response | string \| null | AI response
loading | boolean | Request in progress
error | Error \| null | Error information
reset | Function | Reset hook state

---

### 🤝 Contributing

Contributions are welcome! Please read the Contributing Guide for details.

Steps to contribute:

- Fork the repository
- Create a feature branch
- Commit your changes
- Push to your branch
- Open a Pull Request


  


### 🐛 Troubleshooting

#### CORS Issues with Ollama

Start Ollama with CORS enabled:

```bash
ollama serve --cors "*"
```
API Key Security

Always use environment variables for API keys:
```jsx
import { useChatGPT } from 'your-package-name';

const { ask } = useChatGPT({
  apiKey: process.env.OPENAI_API_KEY, // ✅ Secure
  // apiKey: "sk-..." // ❌ Do not hardcode
});
```

### 📄 License

MIT © Yared Abebe  

