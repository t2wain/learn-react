import { ActionCreator } from "redux";
import {
  CounterActionTypes,
  ICounterIncrementAction,
  ICounterDecrementAction
} from "./counter-types";

export const decrement: ActionCreator<ICounterDecrementAction> = () => {
  return {
    type: CounterActionTypes.DECREMENT
  };
};

export const increment: ActionCreator<ICounterIncrementAction> = () => {
  return {
    type: CounterActionTypes.INCREMENT
  };
};
