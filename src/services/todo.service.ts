import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import type { Status, TodoItem } from "../components/Todo";
import { db } from "../config/firebase";

const COLLECTION_NAME = "todos";
export const addTodo = async (todo: Omit<TodoItem, 'notified'>) => {
  const { content, status, reminder } = todo;
  const todoRef = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(todoRef, {
    content,
    status,
    createdAt: serverTimestamp(),
    reminder: reminder ? Timestamp.fromDate(reminder) : null,
    notified: false
  });
  return docRef.id;
};

export const listenToTodos = (
  cb: (todos: Record<string, TodoItem>) => void,
) => {
  const todosRef = collection(db, "todos");
  const q = query(todosRef, orderBy("createdAt", "asc")); // or "desc" for newest first

  return onSnapshot(q, (snapshot) => {
    const result: Record<string, TodoItem> = {};
    snapshot.forEach((doc) => {
      result[doc.id] = { ...(doc.data() as TodoItem) };
    });
    cb(result);
  });
};

export const toggleTodoStatus = async (id: string, newStatus: Status) => {
  const todoRef = doc(db, "todos", id);
  await updateDoc(todoRef, {
    status: newStatus,
  });
};

export const deleteTodo = async (id: string) => {
  const todoRef = doc(db, "todos", id);
  await deleteDoc(todoRef);
};
