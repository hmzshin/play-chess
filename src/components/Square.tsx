import React from "react";
import rook from "../assets/chess-rook-solid.svg";
import knight from "../assets/chess-knight-solid.svg";
import bishop from "../assets/chess-bishop-solid.svg";
import pawn from "../assets/chess-pawn-solid.svg";
import empty from "../assets/square-solid.svg";
import king from "../assets/chess-king-solid.svg";
import queen from "../assets/chess-queen-solid.svg";
const svg = {
  rook: rook,
  knight: knight,
  bishop: bishop,
  pawn: pawn,
  empty: empty,
  king: king,
  queen: queen,
};

const Square = ({ id, clickHandler, active, table, click }) => {
  return (
    <div
      id={id}
      className={`square ${active == id ? "bg-lime-400" : ""}`}
      onClick={() => clickHandler(id)}
    >
      <img className="w-full h-full" src={svg[table[id]]} />
    </div>
  );
};
export default Square;
