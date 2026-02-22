import { STATUSES, type Status } from "./Todo";
import type { TodoItemType } from "./TodoList";
import { getReminderState } from "../utils/reminderUtils";
import useReminderDropdown from "../hooks/useReminderDropdown";
import { BellButton, ReminderDropdown } from "./reminder";

type TodoItemProps = {
  item: TodoItemType;
  id: string;
  handleCheck: (id: string, status: Status) => void;
  handleDeleteItem: (id: string) => void;
};

const DeleteButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    type="button"
    className="translate relative z-10 cursor-pointer font-semibold after:absolute after:top-[-15%] after:left-[-15%] after:-z-10 after:hidden after:h-[130%] after:w-[130%] after:rounded-full after:bg-text-muted hover:after:block"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18" className="bg-transparent fill-text-primary">
      <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z" />
    </svg>
  </button>
);

const TodoItem = ({ id, item, handleCheck, handleDeleteItem }: TodoItemProps) => {
  const reminderState = getReminderState(item);
  const {
    open, pos, dropdownRef, bellRef, inputRef,
    localValue, setLocalValue,
    toggleDropdown, handleSave, handleClear,
  } = useReminderDropdown(id, item);

  return (
    <div className="flex items-center pr-4" ref={dropdownRef}>
      <input
        className="fancy-checkbox-input peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border-[1px] border-text-primary transition-colors duration-500 ease-in-out after:absolute after:h-1/4 after:w-1/2 after:translate-x-[50%] after:translate-y-[130%] after:rotate-[-45deg] after:border-b-2 after:border-l-2 after:border-white after:opacity-0 after:transition-opacity after:duration-200 after:ease-in-out checked:border-none checked:bg-primary checked:after:opacity-100"
        type="checkbox"
        onChange={() =>
          handleCheck(id, item.status === STATUSES.ACTIVE ? STATUSES.DONE : STATUSES.ACTIVE)
        }
        checked={item.status === "done"}
      />
      <p className="ml-4 text-text-primary peer-checked:text-text-muted peer-checked:line-through">
        {item.content}
      </p>

      <div className="ml-auto flex items-center">
        {item.status !== STATUSES.DONE && (
          <BellButton bellRef={bellRef} reminderState={reminderState} onClick={toggleDropdown} />
        )}
        <DeleteButton onClick={() => handleDeleteItem(id)} />
      </div>

      {open && (
        <ReminderDropdown
          dropdownRef={dropdownRef}
          inputRef={inputRef}
          pos={pos}
          localValue={localValue}
          hasReminder={!!item.reminder}
          onChangeValue={setLocalValue}
          onSave={handleSave}
          onClear={handleClear}
        />
      )}
    </div>
  );
};

export default TodoItem;
