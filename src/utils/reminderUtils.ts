import type { TodoItemType } from "../components/TodoList";

export type ReminderState = "none" | "upcoming" | "past";
export type DropdownPos = { top: number; left: number; width: number };

export const toLocalDatetimeValue = (d: Date) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 16);

export const getReminderState = (item: TodoItemType): ReminderState => {
  if (!item.reminder) return "none";
  const reminderDate =
    typeof item.reminder.toDate === "function"
      ? item.reminder.toDate()
      : new Date(item.reminder as unknown as string);
  return reminderDate.getTime() > Date.now() ? "upcoming" : "past";
};

export const getCurrentReminderValue = (item: TodoItemType): string => {
  if (!item.reminder) return "";
  const d =
    typeof item.reminder.toDate === "function"
      ? item.reminder.toDate()
      : new Date(item.reminder as unknown as string);
  return toLocalDatetimeValue(d);
};
