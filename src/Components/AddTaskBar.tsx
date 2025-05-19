const AddTaskBar = () => {
  return (
    <div
      id="add-task-bar"
      className="flex justify-between rounded-full bg-gray-200 pl-4 focus-within:outline-2"
    >
      <input
        placeholder="Add your task"
        className="h-12 w-4/5 outline-none"
        type="text"
        name="add-task"
        id="add-task"
      />
      <button
        type="button"
        className="w-1/5 min-w-24 rounded-full bg-orange-600 text-white"
      >
        ADD
      </button>
    </div>
  );
};

export default AddTaskBar;
