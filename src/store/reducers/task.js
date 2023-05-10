import { FETCH_TASK } from "../actions/actiontypes";

const initialState = {
  task: {},
};

const task = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASK:
      return action.payload;
    default:
      return state;
  }
};

export default task;