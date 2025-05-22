import { createContext } from "react";
import type { TodoItem } from "../components/Todo";
type TodoContextValue = {
  todoList: Record<string, TodoItem>;
};
export const TodoListContext = createContext<TodoContextValue | null>(null);
