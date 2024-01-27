import React, { useContext, useEffect, useState } from "react";
import { TableContextObject } from "../context/TableContext";
import { socket } from "../../socket";
import { toast } from "react-toastify";
import { UserContextObject } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { dispatchTable } = useContext(TableContextObject);
  const { user, dispatchUser } = useContext(UserContextObject);
  const navigate = useNavigate();

  function joinRoom(event: any) {
    event.preventDefault();
    if (user.username !== "" && user.room !== "" && user.isConnected) {
      socket.emit("joinRoom", user.room, (dataFromServer: string) => {
        dispatchUser({ type: "SET_PIECE", payload: dataFromServer });
        const ismyturn = dataFromServer === "white" ? true : false;
        dispatchUser({ type: "SET_ISMYTURN", payload: ismyturn });
        console.log(
          "socket id:" + socket.id + " is" + dataFromServer + " piece"
        );
      });
      window.alert("odaya katıl");
      navigate("/play-chess/play");
    }
  }

  useEffect(() => {
    socket.on("receiveMove", (data) => {
      console.log("message is sended by : ", data.username);
      dispatchTable({ type: "SET_TABLE", payload: data.table });
      dispatchUser({ type: "SET_ISMYTURN", payload: true });
      if (user.isMoved === false) {
        dispatchUser({ type: "SET_ISMOVED", payload: true });
      }
    });
  }, [socket]);

  useEffect(() => {
    console.log("is it my piece:", user.isMyTurn);
  }, [user.isMyTurn]);
  return (
    <section>
      <form
        onSubmit={joinRoom}
        className="flex justify-center items-center flex-col"
      >
        <label>
          Username:
          <input
            type="text"
            onChange={(e) =>
              dispatchUser({ type: "SET_USERNAME", payload: e.target.value })
            }
            className="border"
          />
        </label>
        <label>
          Room:
          <input
            type="text"
            onChange={(e) =>
              dispatchUser({ type: "SET_ROOM", payload: e.target.value })
            }
            className="border"
          />
        </label>

        <button type="submit" className="flex h-10 p-2 bg-sky-200">
          {" "}
          Join room
        </button>
      </form>
    </section>
  );
};

export default Login;
