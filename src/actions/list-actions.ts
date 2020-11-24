import { ActionCreator } from "redux";
import { createItemLocal, loadItems as loadList } from "../api";
import {
  ListActionTypes,
  IListDelItemAction,
  IListToggleItemAction
} from "./list-types";

export const addItemAction = (name: string, isError?: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: ListActionTypes.ADD_ITEM_BEGIN
    });
    createItemLocal(name)
      .then((item) => {
        dispatch({
          type: ListActionTypes.ADD_ITEM_SUCCESS,
          item
        });
      })
      .catch((errmsg) => {
        dispatch({
          type: ListActionTypes.ADD_ITEM_ERROR,
          errmsg: "Error"
        });
      });
  };
};

export const delItem: ActionCreator<IListDelItemAction> = (itemId: number) => {
  return {
    type: ListActionTypes.DEL_ITEM,
    itemId: itemId
  };
};

export const toggleItem: ActionCreator<IListToggleItemAction> = (
  itemId: number
) => {
  return {
    type: ListActionTypes.TOG_ITEM,
    itemId: itemId
  };
};

export const loadItemsAction = () => {
  return (dispatch: any) => {
    dispatch({
      type: ListActionTypes.LOAD_ITEM_BEGIN
    });
    loadList()
      .then((items) => {
        dispatch({
          type: ListActionTypes.LOAD_ITEM_SUCCESS,
          items
        });
      })
      .catch((errmsg) => {
        dispatch({
          type: ListActionTypes.LOAD_ITEM_ERROR,
          errmsg: `Error: ${errmsg}`
        });
      });
  };
};
