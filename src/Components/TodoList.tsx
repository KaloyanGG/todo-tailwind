import useTodoListContext from "../hooks/useTodoListContext";
import { deleteTodo, toggleTodoStatus } from "../services/todo.service";
import TodoItem from "./TodoItem";
import type { Timestamp } from "firebase/firestore";

type Status = "active" | "done";
export type TodoItemType = {
  content: string;
  status: Status;
  reminder: Timestamp | null;
  notified: boolean;
};

const TodoList = () => {
  const { todoList } = useTodoListContext();

  const handleCheck = (id: string, status: Status) => {
    toggleTodoStatus(id, status);
  };

  const handleDeleteItem = (id: string) => {
    deleteTodo(id);
  };

  return (
    <div id="todo-list" className="space-y-3">
      {Object.entries(todoList).map(([id, todoItem]) => {
        return (
          <TodoItem
            key={id}
            id={id}
            item={todoItem}
            handleCheck={handleCheck}
            handleDeleteItem={handleDeleteItem}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
