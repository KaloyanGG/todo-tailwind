import AddTaskBar from "./AddTaskBar";
import TodoList from "./TodoList";
import { useEffect } from "react";
import { requestNotificationsPermission } from "../services/notifications.service";

export const STATUSES = {
  ACTIVE: "active",
  DONE: "done",
} as const;
export type Status = (typeof STATUSES)[keyof typeof STATUSES];
export type TodoItem = {
  content: string;
  status: Status;
  reminder: Date | null;
  notified: boolean;
};

const Todo = () => {

  useEffect(() => {
    requestNotificationsPermission()
  }, [])
  
  return (
    <div
      id="todo-component"
      className="m-auto h-full w-full max-w-xl space-y-8 overflow-y-auto rounded-xl bg-surface px-4 py-8 md:h-4/5 md:w-4/5 bg-bg"
    >
      <Heading />
      <AddTaskBar />
      <TodoList />
    </div>
  );
};

const Heading = () => {
  return (
    <h1 className="flex items-center gap-2 text-3xl font-semibold tracking-wide lg:justify-center text-text-primary">
      To-Do List
      <img
        className="inline h-12 md:h-10"
        src="https://cdn.iconscout.com/icon/free/png-512/free-to-do-list-icon-download-in-svg-png-gif-file-formats--schedule-message-check-banking-and-finance-pack-business-icons-2947644.png?f=webp&w=256"
      />
    </h1>
  );
};

export default Todo;
