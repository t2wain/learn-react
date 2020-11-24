import React from "react";
import { DefaultButton } from "office-ui-fabric-react";
import { IItem } from "../../../actions/list-types";
import { delItem, toggleItem } from "../../../actions/list-actions";

interface IProps {
  items: IItem[];
  delItem: typeof delItem;
  toggleItem: typeof toggleItem;
}

const List: React.FC<IProps> = ({ items, delItem, toggleItem }) => {
  return items.length ? (
    <ul className="lst-item">
      {items.map((item) => (
        <li className={item.checked ? "done" : ""} key={item.id}>
          {item.name}
          <DefaultButton onClick={() => delItem(item.id)}>x</DefaultButton>
          <DefaultButton onClick={() => toggleItem(item.id)}>y</DefaultButton>
        </li>
      ))}
    </ul>
  ) : (
    <div className="lst-item">No item yet</div>
  );
};

export default List;
