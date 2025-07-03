import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";


//TODO Go the the "FCM Reminders Setup" chat in gpt and follow the polling approach

// TODO Remove in prod at the end
// if(import.meta.env.MODE==='development'){

  window.onerror = function (message, source, lineno, colno, error) {
    const log = `[window.onerror] ${message}`;
    specialLog(log);
  };
  
  window.onunhandledrejection = function (event) {
    const log = `[unhandledrejection] ${event.reason}`;
    specialLog(log);
  };
  
  const originalConsoleInfo = console.info;
  
  console.info = (message: any, ...optionalParams: any[]) => {
    specialLog(message, ...optionalParams);
    originalConsoleInfo(message, ...optionalParams)
  }
  
  function specialLog(log: any, ...optionalParams: any[]) {
    const devTools = document.querySelector('#special-log') as HTMLTextAreaElement;
    if (!devTools) return;
    
    // Combine all log arguments
    const allLogs = [log, ...optionalParams]
    .map(item => {
      if (typeof item === 'string') return item;
      try {
        return JSON.stringify(item, null, 2);
      } catch {
        return String(item);
      }
    })
    .join(' ');
    
    devTools.value += (devTools.value ? '\n\n' : '') + allLogs;
  }
// }
  
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
