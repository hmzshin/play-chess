import "./App.css";
import React, { useEffect } from "react";
import Header from "./components/Header.tsx";
import ChessTable from "./components/ChessTable.tsx";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      toast.success(`You connected with id ${socket.id}`);
      console.log(socket.id);
    });
    socket.emit("customEvent", 10, "Hello");
  }, []);

  return (
    <>
      <Header />
      <ChessTable />
    </>
  );
}

export default App;
