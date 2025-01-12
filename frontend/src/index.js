import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ChatProvider from "./context/ChatProvider";

import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <App />
        <ToastContainer />
      </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
