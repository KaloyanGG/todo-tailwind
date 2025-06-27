import { useEffect, useState } from "react";
import { TodoListContext } from "./context/todoListContext";
import Todo, { type TodoItem } from "./components/Todo";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { listenToTodos } from "./services/todo";
import Login from "./Components/Login";

function App() {
  const [todoList, setTodoList] = useState<Record<string, TodoItem>>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setCheckingAuth(false);
    });

    let unsubTodos: () => void;

    if (isAuthenticated) {
      unsubTodos = listenToTodos((todos) => {
        console.log(todos);
        setTodoList(todos);
      });
    }

    return () => {
      unsubAuth();
      unsubTodos?.();
    };
  }, [isAuthenticated]);

  if (checkingAuth) return <div className="h-screen w-screen bg-rose-100" />;

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
