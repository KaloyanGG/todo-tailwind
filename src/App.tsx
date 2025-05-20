import { useState } from "react";
import Todo, { type TodoItem } from "./components/Todo";
import { TodoListContext } from "./context/todoListContext";

function App() {
  const [todoList, setTodoList] = useState<Map<string, TodoItem>>(new Map());
  return (
    <main className="min-h-dvh bg-rose-100 py-10">
      <TodoListContext.Provider value={{ todoList, setTodoList }}>
        <Todo />
      </TodoListContext.Provider>
    </main>
  );
}

export default App;
