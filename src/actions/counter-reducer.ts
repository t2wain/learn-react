import { Reducer } from "redux";
import { CounterActionTypes, CounterActions } from "./counter-types";

export const counterReducer: Reducer<number, CounterActions> = (
  state = 0,
  action
) => {
  switch (action.type) {
    case CounterActionTypes.INCREMENT:
      return state + 1;
    case CounterActionTypes.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};
