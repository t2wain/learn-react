import "react-app-polyfill/ie11";
import * as React from "react";
import { render } from "react-dom";

import App from "./threejs/app2/App";
// import App from "./app2/App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
