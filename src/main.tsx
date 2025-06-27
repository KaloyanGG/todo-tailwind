import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

window.onerror = function (message, source, lineno, colno, error) {
  const log = `[window.onerror] ${message}`;
  specialLog(log);
};

window.onunhandledrejection = function (event) {
  const log = `[unhandledrejection] ${event.reason}`;
  specialLog(log);
};

const originalConsoleInfo = console.info;

console.info = (message: any, ...optionalParams: any[]) =>{
  specialLog(message);
  originalConsoleInfo(message, ...optionalParams)
}

function specialLog(log: any) {
  const devTools = document.querySelector('#special-log') as HTMLTextAreaElement
  if (!devTools) return;
  devTools.value = devTools.value + (devTools.value ? '\n\n' : '') + log;
}

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);
