import React, { useContext } from "react";
import { svg } from "../data.ts";
import { PossibleMovesContextObject } from "../context/PossibleMovesContext.tsx";
import { TableContextObject } from "../context/TableContext.tsx";
const Square = ({ id, clickHandler, active }) => {
  const { possibleMoves } = useContext(PossibleMovesContextObject);

  const { table } = useContext(TableContextObject);
  return (
    <div
      id={id}
      className={`square ${active == id ? "bg-lime-400" : ""} ${
        possibleMoves.includes(id) ? "border-4 border-green-600" : ""
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
