import React from "react";
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
          <button onClick={() => delItem(item.id)}>x</button>
          <button onClick={() => toggleItem(item.id)}>y</button>
        </li>
      ))}
    </ul>
  ) : (
    <div>No item yet</div>
  );
};

export default List;
