import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "../store/store";
import Counter from "./components/counter/counter";
import ListAdd from "./components/list/list-add";

import "./styles.css";

export default function App() {
  return (
    <Provider store={configureStore()}>
      <div className="app">
        <Counter />
        <ListAdd />
      </div>
    </Provider>
  );
}
