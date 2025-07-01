import React from "react";
import { render } from "react-dom";
import Disconnected from "./disconnected";

render(<Disconnected />, document.querySelector("#app-container"));

if (module.hot) module.hot.accept();
