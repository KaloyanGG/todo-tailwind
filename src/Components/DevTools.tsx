import { useRef, type ButtonHTMLAttributes } from "react"
import { requestNotificationsPermission } from "../services/notifications.service";

const DevTools = ({ hidden }: { hidden: boolean }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleRequestNotificationsPermissionClick = async () => {
    await requestNotificationsPermission();
  };

  const handleClearLogsClick = () => {
    textAreaRef.current!.value = ''
  }

  const logSW = async () => {
    if (!("serviceWorker" in navigator)) {
      console.info("❌ Service Workers not supported in this browser.");
      return;
    }

    const registrations = await navigator.serviceWorker.getRegistrations();

    if (registrations.length === 0) {
      console.info("ℹ️ No active service workers registered.");
      return;
    }

    registrations.forEach((reg, i) => {
      console.info(`🛰️ SW #${i + 1}`);
      console.info("  Scope:", reg.scope);
      console.info("  Active:", reg.active?.scriptURL || "none");
      console.info("  Installing:", reg.installing?.scriptURL || "none");
      console.info("  Waiting:", reg.waiting?.scriptURL || "none");
    });
  };


  return (
    <div hidden={hidden} className='pt-15 bg-amber-200 z-20 fixed right-0 w-full h-lvh flex flex-col items-center gap-1 p-2'>
      <DevToolsButton onClick={handleRequestNotificationsPermissionClick} className="bg-red-50" text="Request Notifications Permission" />
      <DevToolsButton className="bg-green-50" text="Register Service worker" />
      <DevToolsButton onClick={handleClearLogsClick} className="bg-blue-50" text="Clear Logs" />
      <DevToolsButton onClick={logSW} className="bg-pink-50" text="SW" />

      <textarea ref={textAreaRef} id="special-log" className="mt-auto bg-white w-full min-h-1/2 p-1 text-sm"></textarea>
    </div>
  )
}

type DevToolsButtonProps = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>

const DevToolsButton = ({ text, className, ...props }: DevToolsButtonProps) => {
  return <button {...props} className={`${className} text-sm p-2 rounded-full`}>{text}</button>
}

export default DevTools