import useTodoListContext from "../hooks/useTodoListContext";
import TodoItem from "./TodoItem";

type Status = "active" | "done";
export type TodoItemType = {
  content: string;
  status: Status;
};

const TodoList = () => {
  const { todoList, dispatch } = useTodoListContext();

  const handleCheck = (id: string) => {
    dispatch({ type: "checkTask", payload: { id: id } });
  };

  const handleDeleteItem = (id: string) => {
    dispatch({ type: "removeTask", payload: { id: id } });
  };

  return (
    <div id="todo-list" className="space-y-3 overflow-y-auto">
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
