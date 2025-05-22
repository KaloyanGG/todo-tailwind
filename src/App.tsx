import { useEffect, useReducer } from "react";
import { TodoListContext } from "./context/todoListContext";
import { todoListReducer } from "./context/todoListReducer";
import Todo from "./components/Todo";

function App() {
  const [todoList, dispatch] = useReducer(todoListReducer, {});

  useEffect(() => {
    const localStorageTodos = localStorage.getItem("todos");

    if (localStorageTodos) {
      dispatch({
        type: "setTasks",
        payload: JSON.parse(localStorageTodos),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <main className="flex h-svh min-h-svh bg-rose-100">
      <TodoListContext.Provider value={{ todoList, dispatch }}>
        <Todo />
      </TodoListContext.Provider>
    </main>
  );
}

export default App;
