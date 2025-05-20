import useTodoListContext from "../hooks/useTodoListContext";
import TodoItem from "./TodoItem";

type Status = "active" | "done";
export type TodoItemType = {
  content: string;
  status: Status;
};

const TodoList = () => {
  const { todoList, setTodoList } = useTodoListContext();

  const handleCheck = (id: string) => {
    setTodoList((prev) => {
      localStorage.setItem(
        "todos",
        JSON.stringify({
          ...prev,
          [id]: {
            ...prev[id],
            status: prev[id].status === "done" ? "active" : "done",
          },
        }),
      );
      return {
        ...prev,
        [id]: {
          ...prev[id],
          status: prev[id].status === "done" ? "active" : "done",
        },
      };
    });
  };

  return (
    <div id="todo-list" className="h-64 space-y-3 overflow-y-auto">
      {Object.entries(todoList).map(([id, todoItem]) => {
        return (
          <TodoItem
            key={id}
            id={id}
            item={todoItem}
            handleCheck={handleCheck}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
