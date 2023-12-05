import React from "react";
import { svg } from "../data.ts";
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
