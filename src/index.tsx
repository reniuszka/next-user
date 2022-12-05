import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import PersonAppProvider from "./helpers/Context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PersonAppProvider>
      <App />
    </PersonAppProvider>
  </React.StrictMode>
);
