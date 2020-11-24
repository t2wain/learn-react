import { Reducer } from "redux";
import { ListActionTypes, ListActions, IList, ListStatus } from "./list-types";

let initialState: IList = {
  status: ListStatus.SUCCESS,
  errMsg: "",
  items: []
};

export const listReducer: Reducer<IList, ListActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ListActionTypes.ADD_ITEM_BEGIN:
    case ListActionTypes.LOAD_ITEM_BEGIN:
      return {
        ...state,
        errMsg: "",
        status: ListStatus.BEGIN
      };
    case ListActionTypes.ADD_ITEM_SUCCESS:
      return {
        status: ListStatus.SUCCESS,
        errMsg: "",
        items: [...state.items, action.item]
      };
    case ListActionTypes.LOAD_ITEM_SUCCESS:
      return {
        status: ListStatus.SUCCESS,
        errMsg: "",
        items: action.items.map((i) => ({
          id: Math.random(),
          name: i,
          checked: false
        }))
      };
    case ListActionTypes.ADD_ITEM_ERROR:
    case ListActionTypes.LOAD_ITEM_ERROR:
      return {
        ...state,
        errMsg: action.errmsg,
        status: ListStatus.ERROR
      };
    case ListActionTypes.DEL_ITEM:
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.itemId)
      };
    case ListActionTypes.TOG_ITEM:
      let items = state.items.map((i) => {
        if (i.id === action.itemId) {
          return { ...i, checked: !i.checked };
        } else return i;
      });
      return { ...state, items };
    default:
      return state;
  }
};
