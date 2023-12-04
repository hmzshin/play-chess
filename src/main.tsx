import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App..tsx";
import "./index.css";
import PossibleMovesContextProvider from "./context/PossibleMovesContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PossibleMovesContextProvider>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
      />
    </PossibleMovesContextProvider>
  </React.StrictMode>
);
