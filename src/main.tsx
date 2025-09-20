import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// BACKEND: initialize SSO/auth providers and restore session before render if needed
// AIML: optionally preload model configs or feature flags for AI components
createRoot(document.getElementById("root")!).render(<App />);
