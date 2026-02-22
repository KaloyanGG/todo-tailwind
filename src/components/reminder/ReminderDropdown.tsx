import { createPortal } from "react-dom";
import type { DropdownPos } from "../../utils/reminderUtils";
import { toLocalDatetimeValue } from "../../utils/reminderUtils";

type ReminderDropdownProps = {
  dropdownRef: React.Ref<HTMLDivElement>;
  inputRef: React.Ref<HTMLInputElement>;
  pos: DropdownPos;
  localValue: string;
  hasReminder: boolean;
  onChangeValue: (v: string) => void;
  onSave: () => void;
  onClear: () => void;
};

const ReminderDropdown = ({
  dropdownRef,
  inputRef,
  pos,
  localValue,
  hasReminder,
  onChangeValue,
  onSave,
  onClear,
}: ReminderDropdownProps) =>
  createPortal(
    <div
      ref={dropdownRef}
      style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width }}
      className="z-[9999] rounded-xl bg-bg-light shadow-lg p-3 flex flex-col gap-2"
    >
      <span className="text-xs font-semibold text-text-muted">Set reminder</span>
      <input
        ref={inputRef}
        type="datetime-local"
        value={localValue}
        min={toLocalDatetimeValue(new Date())}
        onChange={(e) => onChangeValue(e.target.value)}
        className="text-xs p-1.5 rounded-lg border border-text-muted/30 bg-bg outline-none text-text-primary"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSave}
          disabled={!localValue}
          className="flex-1 rounded-full bg-primary text-text-primary text-xs font-medium py-1 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClear}
          disabled={!localValue && !hasReminder}
          className="flex-1 rounded-full border border-text-muted/40 text-text-muted text-xs font-medium py-1 hover:bg-text-muted/10 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>
    </div>,
    document.body
  );

export default ReminderDropdown;
