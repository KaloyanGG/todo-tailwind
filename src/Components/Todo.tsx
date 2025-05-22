import AddTaskBar from "./AddTaskBar";
import TodoList from "./TodoList";

export const STATUSES = {
  ACTIVE: "active",
  DONE: "done",
} as const;
export type TodoItem = {
  content: string;
  status: (typeof STATUSES)[keyof typeof STATUSES];
};

const Todo = () => {
  return (
    <div
      id="todo-component"
      className="m-auto h-full w-full max-w-xl space-y-8 overflow-y-scroll rounded-xl bg-white px-4 py-8 md:h-4/5 md:w-4/5"
    >
      <Heading />
      <AddTaskBar />
      <TodoList />
    </div>
  );
};

const Heading = () => {
  return (
    <h1 className="flex items-center gap-2 text-3xl font-semibold tracking-wide lg:justify-center">
      To-Do List
      <img
        className="inline h-12 bg-white md:h-10"
        src="https://cdn.iconscout.com/icon/free/png-512/free-to-do-list-icon-download-in-svg-png-gif-file-formats--schedule-message-check-banking-and-finance-pack-business-icons-2947644.png?f=webp&w=256"
      />
    </h1>
  );
};

export default Todo;
