import { useRef, type ButtonHTMLAttributes } from "react"

const DevTools = ({ hidden }: { hidden: boolean }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleRequestNotificationsPermissionClick = async () => {
    if (!("Notification" in window)) {
      console.warn("This browser does not support desktop notification");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      new Notification("Notifications enabled!", {
        body: "You'll now receive updates.",
      });
    } else {
      console.info("Notification permission:", permission);
    }
  };

  const handleClearLogsClick = ()=>{
    textAreaRef.current!.value=''
  }

  return (
    <div hidden={hidden} className='pt-15 bg-amber-200 z-20 fixed right-0 w-full h-lvh flex flex-col items-center gap-1 p-2'>
      <DevToolsButton onClick={handleRequestNotificationsPermissionClick} className="bg-red-50" text="Request Notifications Permission" />
      <DevToolsButton className="bg-green-50" text="Register Service worker" />
      <DevToolsButton onClick={handleClearLogsClick} className="bg-blue-50" text="Clear Logs" />

      <textarea ref={textAreaRef} id="special-log" className="mt-auto bg-white w-full min-h-1/2 p-1 text-sm">

      </textarea>
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