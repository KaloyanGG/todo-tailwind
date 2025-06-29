import { useEffect, useRef, useState } from "react";
import { addTodo } from "../services/todo.service";
import { STATUSES } from "./Todo";

const AddTaskBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [showReminderLabel, setShowReminderLabel] = useState(true);
  const reminderRef = useRef<HTMLInputElement>(null);

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
      className="flex justify-between rounded-full bg-gray-200 pl-4 focus-within:outline-2"
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
      <div id="reminder-container" className="flex w-1/4 min-w-44 items-center">
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
            className="w-full p-1 text-[var(--gray)] outline-none"
            onBlur={(e) => {
              if (!e.currentTarget.value) {
                setShowReminderLabel(true);
              }
            }}
          />
        )}
      </div>
      <button
        type="submit"
        className="w-1/5 min-w-24 rounded-full bg-[var(--orange)] text-white"
      >
        ADD
      </button>
    </form>
  );
};

export default AddTaskBar;
