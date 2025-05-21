import type { TodoItemType } from "./TodoList";

type TodoItemProps = {
  item: TodoItemType;
  id: string;
  handleCheck: (id: string) => void;
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
      <p className="ml-4 peer-checked:text-[var(--gray)] peer-checked:line-through">
        {item.content}
      </p>
      <button
        type="button"
        className="translate relative z-10 ml-auto cursor-pointer font-semibold text-[var(--gray)] after:absolute after:top-[-15%] after:left-[-15%] after:-z-10 after:hidden after:h-[130%] after:w-[130%] after:rounded-full after:bg-gray-100 hover:after:block"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="18"
          width="18"
          className="bg-transparent fill-[var(--gray)]"
        >
          <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
