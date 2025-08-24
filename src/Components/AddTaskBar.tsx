import { useEffect, useRef, useState } from "react";
import { addTodo } from "../services/todo.service";
import { STATUSES } from "./Todo";
import React from "react";

const toLocalDatetimeValue = (d: Date) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);

const AddTaskBar = () => {
  const [showReminderLabel, setShowReminderLabel] = useState(true);
  const desktopReminderRef = useRef<HTMLInputElement>(null);
  const mobileReminderRef = useRef<HTMLInputElement>(null);
  const [reminderValue, setReminderValue] = useState("");

  const [taskContentValue, setTaskContentValue] = useState('');
  const taskInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showReminderLabel) {
      desktopReminderRef.current?.focus();
    }
  }, [showReminderLabel]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const taskInput = form.elements.namedItem("task-input") as HTMLInputElement;
    const taskValue = taskInput.value.trim();

    try {
      // eslint-disable-next-line no-debugger
      debugger;
      // await addTodo({
      //   content: taskValue,
      //   status: STATUSES.ACTIVE,
      //   reminder: reminderValue ? new Date(reminderValue) : null, // uses state
      // });
      form.reset();
      setReminderValue("");
      setShowReminderLabel(true);
    } catch (e) {
      alert("Error adding todo item, please check the logs");
      console.error(e);
    }
  };

  const openNativePicker = (el: HTMLInputElement | null) => {
    if (!el) return;
    // el.showPicker(); - desktop
    // el.focus(); - iphone
    // alert(HTMLInputElement.prototype.showPicker)
  };

  const handleFormReset = () => {
    setReminderValue('');
    // if (!taskInputRef.current) return;
    // taskInputRef.current.value = '';
    setTaskContentValue('')
  }


  // TODO:
  // 1. Fix styling of bell in iphone
  // 2. Fix functionality of focus of calendaer
  // 3. Choose styling when the "clear" shows vs not shows

  return (
    <form
      id="add-task-bar"
      className="flex justify-between rounded-full bg-bg-light pl-4 focus-within:outline-2"
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <TaskContentInput
        value={taskContentValue}
        onChange={(e) => setTaskContentValue(e.target.value)}
      />
      <div id="reminder-container" className="hidden sm:flex w-2/5 items-center">
        {showReminderLabel ? (
          <button
            className="h-full w-full text-start text-text-muted"
            onClick={() => {
              setShowReminderLabel(false);
            }}
          >
            Reminder
          </button>
        ) : (
          <input
            ref={desktopReminderRef}
            type="datetime-local"
            placeholder="hi"
            name="reminder"
            id="reminder"
            value={reminderValue}
            className={` text-xs w-full p-1 ${reminderValue ? 'text-text-primary' : 'text-[var(--gray)]'} outline-none`}
            min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 16)}
            onFocus={() => {
              if (!reminderValue) {
                setReminderValue(toLocalDatetimeValue(new Date(Date.now() + 60_000)));
              }
            }}
            onChange={(e) => {
              const value = e.target.value;

              if (!value) {
                setReminderValue("");
                setShowReminderLabel(true);
                setTimeout(() => desktopReminderRef.current?.blur(), 0);
              } else {
                setReminderValue(value);
              }
            }}
          />
        )}
      </div>
      {/* MOBILE REMINDER (visually hidden, picker opened by the bell button) */}
      <input
        ref={mobileReminderRef}
        type="datetime-local"
        name="reminder"
        id="reminder-mobile"
        value={reminderValue}
        onChange={(e) => {
          setReminderValue(e.target.value);
        }}
        className="block sm:hidden p-0 m-0 border-0 outline-2 w-0 h-0 opacity-0 absolute"
      //         w-0 h-0 opacity-0 absolute
      />

      <OpenNativePickerButton
        onClick={() => openNativePicker(mobileReminderRef.current)}
        reminderValue={reminderValue}
      />
      {(taskContentValue || reminderValue) && <ResetButton />}
      <AddButton />
    </form>
  );
};

type TaskContentInputProps = React.InputHTMLAttributes<HTMLInputElement>;
const TaskContentInput = ({...props}: TaskContentInputProps) => {
  return <input
    placeholder="Add your task"
    className="h-12 w-4/5 outline-none placeholder:text-text-muted text-text-primary"
    type="text"
    id="task-input"
    name="task-input"
    required
    {...props}
  />
};

type OpenNativePickerButtonProps = {
  onClick: () => void;
  reminderValue: string;
}
const OpenNativePickerButton = ({ onClick, reminderValue }: OpenNativePickerButtonProps) => {
  return <button type="button" className="flex mx-4 relative sm:hidden"
    onClick={onClick}
  >
    <svg viewBox="0 0 24 24" className="fill-text-primary w-6"><path d="M18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10V18H18V10ZM20 18.6667L20.4 19.2C20.5657 19.4209 20.5209 19.7343 20.3 19.9C20.2135 19.9649 20.1082 20 20 20H4C3.72386 20 3.5 19.7761 3.5 19.5C3.5 19.3918 3.53509 19.2865 3.6 19.2L4 18.6667V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V18.6667ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>
    {reminderValue && (
      <span className="absolute top-1 -right-0.5 inline-block h-2 w-2 rounded-full bg-primary" />
    )}
  </button>
}

const AddButton = () => {
  return <>
    <button
      type="submit"
      className="hidden sm:block cursor-pointer w-1/5 min-w-24 rounded-full bg-primary text-text-primary font-medium"
    >
      ADD
    </button>
    <button
      type="submit"
      className="sm:hidden text-3xl cursor-pointer w-1/8 min-w-12 rounded-full bg-primary text-text-primary"
    >
      +
    </button>
  </>
}

const ResetButton = () => {
  return <button
    type="reset"
    className="sm:hidden relative translate mx-4 z-10 cursor-pointer font-semibold after:absolute after:top-[-15%] after:left-[-15%] after:-z-10 after:hidden after:h-[130%] after:w-[130%] after:rounded-full after:bg-text-muted hover:after:block"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height="18"
      width="18"
      className="bg-transparent fill-text-primary"
    >
      <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
    </svg>
  </button>
}

export default AddTaskBar;
