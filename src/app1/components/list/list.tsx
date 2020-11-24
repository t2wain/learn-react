import React from "react";
import Button from "react-bootstrap/Button";
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
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => delItem(item.id)}
          >
            x
          </Button>
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => toggleItem(item.id)}
          >
            y
          </Button>
        </li>
      ))}
    </ul>
  ) : (
    <div>No item yet</div>
  );
};

export default List;
