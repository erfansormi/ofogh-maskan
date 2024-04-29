import "./styles/index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import UserContextProvider from "./context/user-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
