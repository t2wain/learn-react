import React, { useState } from "react";
import { connect } from "react-redux";
import { DefaultButton } from "office-ui-fabric-react";
import { TextField, ITextField } from "office-ui-fabric-react/lib/TextField";
import { IAppState } from "../../../store/store";
import { IList, ListStatus } from "../../../actions/list-types";
import List from "./list";
import {
  addItemAction,
  delItem,
  toggleItem,
  loadItemsAction,
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
  let txtitem: React.RefObject<ITextField> = React.createRef();

  let handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | undefined
  ) => {
    setItemName(newValue || "");
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
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="list-form">
        <TextField
          placeholder="Enter item"
          value={itemName}
          componentRef={txtitem}
          onChange={handleChange}
        />
        <DefaultButton
          style={{ width: "100%", margin: "0.5rem 0" }}
          type="submit"
          onClick={addItem}
          disabled={!itemName}
        >
          Add
        </DefaultButton>
        <DefaultButton style={{ width: "100%" }} onClick={props.loadItems}>
          Load Items
        </DefaultButton>
        <h3 className="list-status">{msg}</h3>
      </div>

      <List
        items={props.list.items}
        delItem={props.delItem}
        toggleItem={props.toggleItem}
      />
    </form>
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
    loadItems: () => dispatch(loadItemsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAdd);
