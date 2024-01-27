import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App..tsx";
import "./index.css";
import PossibleMovesContextProvider from "./context/PossibleMovesContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableContextProvider from "./context/TableContext.tsx";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <TableContextProvider>
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
        </TableContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
