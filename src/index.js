import { StrictMode } from "react";
import ReactDOM from "react-dom";
import DynamicSelect from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <DynamicSelect />
  </StrictMode>,
  rootElement
);
