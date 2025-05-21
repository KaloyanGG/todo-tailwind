import { createContext } from "react";
import type { TodoItem } from "../components/Todo";
import type { TodoListAction } from "./todoListReducer";
type TodoContextValue = {
  todoList: Record<string, TodoItem>;
  dispatch: React.ActionDispatch<[action: TodoListAction]>;
};
export const TodoListContext = createContext<TodoContextValue | null>(null);
