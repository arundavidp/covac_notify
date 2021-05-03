import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "minireset.css";

// import App from "./App";
import Dashboard from "./Dashboard";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
  rootElement
);
