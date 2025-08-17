import { useEffect, useRef, useState } from "react";
import { addTodo } from "../services/todo.service";
import { STATUSES } from "./Todo";

const AddTaskBar = () => {
  const [showReminderLabel, setShowReminderLabel] = useState(true);
  const reminderRef = useRef<HTMLInputElement>(null);

  const [reminderValue, setReminderValue] = useState("");

  useEffect(() => {
    if (!showReminderLabel) {
      // Wait until input is shown, then focus
      reminderRef.current?.focus();
    }
  }, [showReminderLabel]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const taskInput = form.elements.namedItem("task-input") as HTMLInputElement;
    const reminderInput = form.elements.namedItem(
      "reminder",
    ) as HTMLInputElement;
    const taskValue = taskInput.value.trim();
    const reminderValue = reminderInput?.value;

    try {
      await addTodo({
        content: taskValue,
        status: STATUSES.ACTIVE,
        reminder: reminderValue ? new Date(reminderValue) : null,
      });
      form.reset();
    } catch (e) {
      alert("Error adding todo item, please check the logs");
      console.error(e);
    }
  };

  return (
    <form
      id="add-task-bar"
      className="flex justify-between rounded-full bg-bg-light pl-4 focus-within:outline-2"
      onSubmit={handleFormSubmit}
    >
      <input
        placeholder="Add your task"
        className="h-12 w-4/5 outline-none"
        type="text"
        id="task-input"
        name="task-input"
        required
      />
      <div id="reminder-container" className="flex w-2/5 items-center">
        {showReminderLabel ? (
          <button
            className="h-full w-full text-start text-[var(--gray)]"
            onClick={() => {
              setShowReminderLabel(false);
            }}
          >
            Reminder
          </button>
        ) : (
          <input
            ref={reminderRef}
            type="datetime-local"
            placeholder="hi"
            name="reminder"
            id="reminder"
            value={reminderValue}
            className={` text-xs w-full p-1 ${reminderValue ? 'text-black' : 'text-[var(--gray)]'} outline-none`}
            min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 16)}
            onFocus={() => {
              if (!reminderValue) {
                const nextMinute = new Date(Date.now() + 60_000);
                const localDateTime = new Date(nextMinute.getTime() - nextMinute.getTimezoneOffset() * 60_000)
                  .toISOString()
                  .slice(0, 16);
                setReminderValue(localDateTime);
              }
            }}
            onChange={(e) => {
              const value = e.target.value;

              if (!value) {
                setReminderValue("");
                setShowReminderLabel(true);
                setTimeout(() => reminderRef.current?.blur(), 0);
              } else {
                setReminderValue(value);
              }
            }}
          />
        )}
      </div>
      <button
        type="submit"
        className="cursor-pointer w-1/5 min-w-24 rounded-full bg-primary text-white"
      >
        ADD
      </button>
    </form>
  );
};

export default AddTaskBar;
