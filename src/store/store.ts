import { createStore, Store, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { counterReducer } from "../actions/counter-reducer";
import { listReducer } from "../actions/list-reducer";
import { IList } from "../actions/list-types";

export interface IAppState {
  count: number;
  list: IList;
}

const rootReducer = combineReducers<IAppState>({
  count: counterReducer,
  list: listReducer
});

export default function configureStore(): Store<IAppState> {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}
