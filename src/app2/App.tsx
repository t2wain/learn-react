import * as React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import configureStore from "../store/store";
import Counter from "./components/counter/counter";
import ListAdd from "./components/list/list-add";
import TopNav from "./components/app-nav";
import { initializeIcons } from "@uifabric/icons";
import "./styles.css";

initializeIcons();

export default function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <TopNav />
        <div className="app">
          <Route path="/counter" component={Counter} />
          <Route path="/list" component={ListAdd} />
          <Route exact path="/" component={Counter} />
          <Route exact path="/" component={ListAdd} />
        </div>
      </Router>
    </Provider>
  );
}
