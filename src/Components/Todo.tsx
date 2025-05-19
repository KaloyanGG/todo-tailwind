import AddTaskBar from "./AddTaskBar";
import TodoList from "./TodoList";

const Todo = () => {
  return (
    <div
      id="todo-component"
      className="m-auto w-3xl space-y-8 rounded-xl bg-white p-8"
    >
      <Heading />
      <AddTaskBar />
      <TodoList />
    </div>
  );
};

const Heading = () => {
  return (
    <h1 className="text-xl font-semibold tracking-wide">
      To-Do List
      <img
        className="ml-2 inline h-6 bg-white"
        src="https://cdn.iconscout.com/icon/free/png-512/free-to-do-list-icon-download-in-svg-png-gif-file-formats--schedule-message-check-banking-and-finance-pack-business-icons-2947644.png?f=webp&w=256"
      />
    </h1>
  );
};

export default Todo;
