import type { ReminderState } from "../../utils/reminderUtils";
import BellIcon from "./BellIcon";

type BellButtonProps = {
  bellRef: React.Ref<HTMLButtonElement>;
  reminderState: ReminderState;
  onClick: () => void;
};

const BellButton = ({ bellRef, reminderState, onClick }: BellButtonProps) => (
  <div className="mr-2">
    <button
      ref={bellRef}
      type="button"
      title={
        reminderState === "upcoming" ? "Reminder set"
        : reminderState === "past" ? "Reminder expired"
        : "Add reminder"
      }
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer p-1 rounded-full hover:bg-text-muted/20 transition-colors"
    >
      <BellIcon state={reminderState} />
    </button>
  </div>
);

export default BellButton;
