import { useRef, useState } from "react";
import useTodoListContext from "../hooks/useTodoListContext";
import { v4 } from "uuid";

const AddTaskBar = () => {
  const { setTodoList } = useTodoListContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const handleAddTodoItem = () => {
    setTodoList((prev) => {
      return {
        ...prev,
        [v4()]: {
          content: inputValue.trim(),
          status: "active",
        },
      };
    });
    setInputValue("");
    inputRef.current?.focus();
  };
  return (
    <div
      id="add-task-bar"
      className="flex justify-between rounded-full bg-gray-200 pl-4 focus-within:outline-2"
    >
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add your task"
        className="h-12 w-4/5 outline-none"
        type="text"
        name="add-task"
        id="add-task"
      />
      <button
        type="button"
        className="w-1/5 min-w-24 rounded-full bg-[var(--orange)] text-white"
        onClick={handleAddTodoItem}
      >
        ADD
      </button>
    </div>
  );
};

export default AddTaskBar;
