import "./App.css";
import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import GamePage from "./pages/GamePage.tsx";
import { socket } from "../socket.ts";
import { toast } from "react-toastify";
import { UserContextObject } from "./context/UserContext.tsx";

function App() {
  const { dispatchUser } = useContext(UserContextObject);
  useEffect(() => {
    socket.on("connect", () => {
      dispatchUser({ type: "SET_ISCONNECTED", payload: true });
      toast.success("Succesfully connected");
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/play-chess/" element={<HomePage />} />
        <Route path="/play-chess/play" element={<GamePage />} />
      </Routes>
    </>
  );
}

export default App;
