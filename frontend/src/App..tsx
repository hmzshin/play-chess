import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header.tsx";
import ChessTable from "./components/ChessTable.tsx";
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

  useEffect(() => {
    socket.on("receiveMove", (data) => {
      console.log("message is sended by : ", data.username);
      dispatchTable({ type: "SET_TABLE", payload: data.table });
      setIsMyTurn(true);
      if (isMoved === false) {
        setIsMoved(true);
      }
    });
  }, [socket]);

  useEffect(() => {
    console.log("is it my piece:", isMyTurn);
  }, [isMyTurn]);

  return (
    <>
      <form onSubmit={joinRoom} className="flex justify-center items-center">
        <label>
          Username:
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="border"
          />
        </label>
        <label>
          Room:
          <input
            type="text"
            onChange={(e) => setRoom(e.target.value)}
            className="border"
          />
        </label>

        <button type="submit" className="flex h-10 p-2 bg-sky-200">
          {" "}
          Join room
        </button>
      </form>
      <Header />
      <ChessTable
        username={username}
        room={room}
        piece={piece}
        isMyTurn={isMyTurn}
        setIsMyTurn={setIsMyTurn}
        isMoved={isMoved}
        setIsMoved={setIsMoved}
      />
    </>
  );
}

export default App;
