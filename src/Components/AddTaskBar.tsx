import { useRef, useState } from "react";
import { addTodo } from "../services/todo";

const AddTaskBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const handleAddTodoItem = async () => {
    const inputValueTrimmed = inputValue.trim();
    if (inputValueTrimmed === "") {
      inputRef.current?.focus();
      return;
    }
    try {
      await addTodo({
        content: inputValueTrimmed,
        status: "active",
      });
    } catch (err) {
      alert("Error adding todo item, please check the logs");
    }

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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTodoItem();
          }
        }}
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
