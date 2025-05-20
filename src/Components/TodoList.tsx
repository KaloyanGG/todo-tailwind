import useTodoListContext from "../hooks/useTodoListContext";

type Status = "active" | "done";
type TodoItem = {
  content: string;
  status: Status;
};

type TodoItemProps = {
  item: TodoItem;
  id: string;
  handleCheck: (id: string) => void;
};

const TodoList = () => {
  const { todoList, setTodoList } = useTodoListContext();

  const handleCheck = (id: string) => {
    setTodoList((prev) => {
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
    <div id="todo-list" className="space-y-3">
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

const TodoItem = ({ id, item, handleCheck }: TodoItemProps) => {
  return (
    <div className="flex items-center pr-4">
      <input
        className="fancy-checkbox-input peer relative aspect-square h-6 cursor-pointer appearance-none rounded-full border-[1px] border-[var(--gray)] transition-colors duration-500 ease-in-out after:absolute after:h-1/4 after:w-1/2 after:translate-x-[50%] after:translate-y-[130%] after:rotate-[-45deg] after:border-b-2 after:border-l-2 after:border-white after:opacity-0 after:transition-opacity after:duration-200 after:ease-in-out after:content-[''] checked:border-none checked:bg-[var(--orange)] checked:after:opacity-100"
        type="checkbox"
        onChange={() => handleCheck(id)}
        checked={item.status === "done"}
      />
      <p className="ml-2 peer-checked:text-[var(--gray)] peer-checked:line-through">
        {item.content}
      </p>
      <button
        type="button"
        className="ml-auto cursor-pointer font-semibold text-[var(--gray)] hover:shadow-lg hover:shadow-black"
      >
        x
      </button>
    </div>
  );
};

export default TodoList;
