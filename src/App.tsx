import { useEffect, useReducer, useState } from "react";
import { TodoListContext } from "./context/todoListContext";
import { todoListReducer } from "./context/todoListReducer";
import Todo from "./components/Todo";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import Login from "./components/Login";

function App() {
  const [todoList, dispatch] = useReducer(todoListReducer, {});

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const localStorageTodos = localStorage.getItem("todos");

    if (localStorageTodos) {
      dispatch({
        type: "setTasks",
        payload: JSON.parse(localStorageTodos),
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList, isAuthenticated]);

  if (!isAuthenticated)
    return <Login onLogin={() => setIsAuthenticated(true)} />;

  return (
    <main className="flex h-svh min-h-svh bg-rose-100">
      <TodoListContext.Provider value={{ todoList, dispatch }}>
        <Todo />
      </TodoListContext.Provider>
    </main>
  );
}

export default App;
