import "./App.css";
import React, { useEffect } from "react";
import Header from "./components/Header.tsx";
import ChessTable from "./components/ChessTable.tsx";

function App() {

  return (
    <>
      <Header />
      <ChessTable />
    </>
  );
}

export default App;
