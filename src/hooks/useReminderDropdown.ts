import { useEffect, useRef, useState } from "react";
import { setTodoReminder } from "../services/todo.service";
import type { TodoItemType } from "../components/TodoList";
import { getCurrentReminderValue, type DropdownPos } from "../utils/reminderUtils";

const useReminderDropdown = (id: string, item: TodoItemType) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<DropdownPos>({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentReminderValue = getCurrentReminderValue(item);
  const [localValue, setLocalValue] = useState(currentReminderValue);

  useEffect(() => {
    setLocalValue(currentReminderValue);
  }, [currentReminderValue]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !bellRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
        setLocalValue(currentReminderValue);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, currentReminderValue]);

  const openDropdown = () => {
    if (!bellRef.current) return;
    const rect = bellRef.current.getBoundingClientRect();
    const width = Math.min(window.innerWidth >= 640 ? 260 : 200, window.innerWidth - 16);
    const left = Math.max(8, rect.right - width);
    setPos({ top: rect.bottom + 8, left, width });
    setOpen(true);
  };

  const toggleDropdown = () => (open ? setOpen(false) : openDropdown());

  const handleSave = async () => {
    try {
      await setTodoReminder(id, localValue ? new Date(localValue) : null);
      setOpen(false);
    } catch (e) {
      alert("Error setting reminder");
      console.error(e);
    }
  };

  const handleClear = async () => {
    try {
      await setTodoReminder(id, null);
      setLocalValue("");
      setOpen(false);
    } catch (e) {
      alert("Error clearing reminder");
      console.error(e);
    }
  };

  return {
    open, pos, dropdownRef, bellRef, inputRef,
    localValue, setLocalValue,
    toggleDropdown, handleSave, handleClear,
  };
};

export default useReminderDropdown;
