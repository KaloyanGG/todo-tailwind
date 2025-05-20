import { useContext } from "react";
import { TodoListContext } from "../context/todoListContext";

const useTodoListContext = () => {
  const ctx = useContext(TodoListContext);
  if (!ctx)
    throw new Error("useTodoListContext must be used inside <TodoProvider>");

  return ctx;
};

export default useTodoListContext;
