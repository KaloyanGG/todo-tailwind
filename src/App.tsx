import { useEffect, useState } from "react";
import { TodoListContext } from "./context/todoListContext";
import Todo, { type TodoItem } from "./components/Todo";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import Login from "./components/Login";
import { listenToTodos } from "./services/todo";

function App() {
  const [todoList, setTodoList] = useState<Record<string, TodoItem>>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    let unsubTodos: () => void;

    if (isAuthenticated) {
      unsubTodos = listenToTodos((todos) => {
        setTodoList(todos);
      });
    }

    return () => {
      unsubAuth();
      unsubTodos?.();
    };
  }, [isAuthenticated]);

  if (!isAuthenticated)
    return <Login onLogin={() => setIsAuthenticated(true)} />;

  return (
    <main className="flex h-svh min-h-svh bg-rose-100">
      <TodoListContext.Provider value={{ todoList }}>
        <Todo />
      </TodoListContext.Provider>
    </main>
  );
}

export default App;
