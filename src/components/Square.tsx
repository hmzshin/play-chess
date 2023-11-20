import React from "react";
import blackRook from "../assets/chess-rook-solid.svg";
import blackKnight from "../assets/chess-knight-solid.svg";
import blackBishop from "../assets/chess-bishop-solid.svg";
import blackPawn from "../assets/chess-pawn-solid.svg";
import blackKing from "../assets/chess-king-solid.svg";
import blackQueen from "../assets/chess-queen-solid.svg";
import whiteRook from "../assets/chess-rook-regular.svg";
import whiteKnight from "../assets/chess-knight-regular.svg";
import whiteBishop from "../assets/chess-bishop-regular.svg";
import whitePawn from "../assets/chess-pawn-regular.svg";
import whiteKing from "../assets/chess-king-regular.svg";
import whiteQueen from "../assets/chess-queen-regular.svg";

const svg = {
  blackRook: blackRook,
  blackKnight: blackKnight,
  blackBishop: blackBishop,
  blackPawn: blackPawn,
  blackKing: blackKing,
  blackQueen: blackQueen,
  whiteRook: whiteRook,
  whiteKnight: whiteKnight,
  whiteBishop: whiteBishop,
  whitePawn: whitePawn,
  whiteKing: whiteKing,
  whiteQueen: whiteQueen,
};

const Square = ({ id, clickHandler, active, table, possible }) => {
  return (
    <div
      id={id}
      className={`square ${active == id ? "bg-lime-400" : ""} ${
        possible.includes(id) ? "border-4 border-green-600" : ""
      } `}
      onClick={() => clickHandler(id)}
    >
      {table[id] != "empty" && (
        <img className="w-full h-full" src={svg[table[id]]} />
      )}
    </div>
  );
};
export default Square;
