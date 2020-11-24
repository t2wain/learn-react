export enum CounterActionTypes {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT"
}

export interface ICounterIncrementAction {
  type: CounterActionTypes.INCREMENT;
}

export interface ICounterDecrementAction {
  type: CounterActionTypes.DECREMENT;
}

export type CounterActions = ICounterIncrementAction | ICounterDecrementAction;
