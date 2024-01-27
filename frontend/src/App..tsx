import "./App.css";
import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import GamePage from "./pages/GamePage.tsx";
import { socket } from "../socket.ts";
import { toast } from "react-toastify";
import { socket } from "../socket.ts";
import { TableContextObject } from "./context/TableContext.tsx";

function App() {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [piece, setPiece] = useState<string>("");
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const { dispatchTable } = useContext(TableContextObject);

  function joinRoom(event: any) {
    event.preventDefault();
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", room, (dataFromServer: string) => {
        setPiece(dataFromServer);
        setIsMyTurn(dataFromServer === "white" ? true : false);
        console.log(
          "socket id:" + socket.id + " is" + dataFromServer + " piece"
        );
      });
      window.alert("odaya katıl");
    }
  }

  useEffect(() => {
    socket.on("connect", () => {
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
