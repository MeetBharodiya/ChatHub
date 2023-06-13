import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <>
      <App />
      <Toaster
        toastOptions={{
          duration: 1500,
          position:"top-right"
        }}
      />
    </>
  // </React.StrictMode>
);
