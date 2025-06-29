import { useEffect, useState } from "react";
import { TodoListContext } from "./context/todoListContext";
import Todo, { type TodoItem } from "./components/Todo";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { listenToTodos } from "./services/todo.service";
import DevTools from "./components/DevTools";
import Login from "./components/Login";

function App() {
  const [todoList, setTodoList] = useState<Record<string, TodoItem>>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [devToolsShown, setDevToolsShown] = useState(false);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setCheckingAuth(false);
    });

    let unsubTodos: () => void;

    if (isAuthenticated) {
      unsubTodos = listenToTodos((todos) => {
        // console.log(todos);
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
      <button className="text-sm z-30 fixed right-2 top-2 bg-cyan-500 p-2 rounded-full" onClick={() => setDevToolsShown(!devToolsShown)}>Open Dev Tools</button>
      <DevTools hidden={!devToolsShown} />
      <TodoListContext.Provider value={{ todoList }}>
        <Todo />
      </TodoListContext.Provider>
    </main>
  );
}

export default App;
