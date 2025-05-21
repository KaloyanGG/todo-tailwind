import { type TodoItem, STATUSES } from "../components/Todo";

type SetTasks = {
  type: "setTasks";
  payload: Record<string, TodoItem>;
};
type AddTask = {
  type: "addTask";
  payload: {
    content: string;
    id: string;
  };
};
type RemoveTask = {
  type: "removeTask";
  payload: {
    id: string;
  };
};
type CheckTask = {
  type: "checkTask";
  payload: {
    id: string;
  };
};

export type TodoListAction = SetTasks | AddTask | RemoveTask | CheckTask;

export const todoListReducer = (
  state: Record<string, TodoItem>,
  action: TodoListAction,
) => {
  switch (action.type) {
    case "setTasks":
      return action.payload;
    case "addTask": {
      const { id, content } = action.payload;
      return {
        ...state,
        [id]: {
          content: content,
          status: STATUSES.ACTIVE,
        },
      };
    }
    case "removeTask": {
      const { id } = action.payload;
      const { [id]: _, ...rest } = state;
      return rest;
    }
    case "checkTask": {
      const { id } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          status:
            state[id].status === STATUSES.DONE
              ? STATUSES.ACTIVE
              : STATUSES.DONE,
        },
      };
    }
    default:
      return state;
  }
};
