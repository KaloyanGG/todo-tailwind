import { useRef, useState } from "react";
import { addTodo } from "../services/todo.service";
import { STATUSES } from "./Todo";
import React from "react";

const AddTaskBar = () => {
  const [taskContentValue, setTaskContentValue] = useState('');
  const taskInputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const taskInput = form.elements.namedItem("task-input") as HTMLInputElement;
    const taskValue = taskInput.value.trim();

    try {
      await addTodo({
        content: taskValue,
        status: STATUSES.ACTIVE,
        reminder: null,
      });
      form.reset();
      setTaskContentValue("");
    } catch (e) {
      alert("Error adding todo item, please check the logs");
      console.error(e);
    }
  };

  const handleFormReset = () => {
    setTaskContentValue('');
  };

  return (
    <form
      id="add-task-bar"
      className="flex justify-between rounded-full bg-bg-light pl-4 focus-within:outline-2"
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <TaskContentInput
        ref={taskInputRef}
        value={taskContentValue}
        onChange={(e) => setTaskContentValue(e.target.value)}
      />
      {taskContentValue && <ResetButton />}
      <AddButton />
    </form>
  );
};

type TaskContentInputProps = React.InputHTMLAttributes<HTMLInputElement>;
const TaskContentInput = React.forwardRef<HTMLInputElement, TaskContentInputProps>(
  ({ ...props }, ref) => {
    return (
      <input
        ref={ref}
        placeholder="Add your task"
        className="h-12 w-full outline-none placeholder:text-text-muted text-text-primary"
        type="text"
        id="task-input"
        name="task-input"
        required
        {...props}
      />
    );
  }
);

const AddButton = () => {
  return (
    <>
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
  );
};

const ResetButton = () => {
  return (
    <button
      type="reset"
      className="relative translate mx-4 z-10 cursor-pointer font-semibold after:absolute after:top-[-15%] after:left-[-15%] after:-z-10 after:hidden after:h-[130%] after:w-[130%] after:rounded-full after:bg-text-muted hover:after:block"
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
  );
};

export default AddTaskBar;
