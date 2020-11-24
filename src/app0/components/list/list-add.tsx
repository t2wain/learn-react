import React, { useState } from "react";
import { connect } from "react-redux";
import { IAppState } from "../../../store/store";
import { IList, ListStatus } from "../../../actions/list-types";
import List from "./list";
import {
  addItemAction,
  delItem,
  toggleItem,
  loadItemsAction
} from "../../../actions/list-actions";

interface IProps {
  list: IList;
  addItem: typeof addItemAction;
  delItem: typeof delItem;
  toggleItem: typeof toggleItem;
  loadItems: typeof loadItemsAction;
}

const ListAdd: React.FC<IProps> = (props) => {
  const [itemName, setItemName] = useState("");
  let txtitem: React.RefObject<HTMLInputElement> = React.createRef();

  let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };

  let addItem = () => {
    props.addItem(itemName);
    setItemName("");
    txtitem.current?.focus();
  };

  let msg = "Ready";
  switch (props.list.status) {
    case ListStatus.BEGIN:
      msg = "Waiting...";
      break;
    case ListStatus.SUCCESS:
      msg = "Ready";
      break;
    case ListStatus.ERROR:
      msg = props.list.errMsg;
      break;
  }

  return (
    <div className="list-form">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter item"
          value={itemName}
          ref={txtitem}
          onChange={handleChange}
        />

        <button type="submit" onClick={addItem} disabled={!itemName}>
          Add
        </button>
        <button onClick={props.loadItems}>Load Items</button>
        <h3 className="list-status">{msg}</h3>
        <List
          items={props.list.items}
          delItem={props.delItem}
          toggleItem={props.toggleItem}
        />
      </form>
    </div>
  );
};

function mapStateToProps(state: IAppState) {
  return { list: state.list };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addItem: (name: string) => dispatch(addItemAction(name)),
    delItem: (itemId: number) => dispatch(delItem(itemId)),
    toggleItem: (itemId: number) => dispatch(toggleItem(itemId)),
    loadItems: () => dispatch(loadItemsAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAdd);
