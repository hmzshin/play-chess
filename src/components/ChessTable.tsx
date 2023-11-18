import React, { useEffect, useState } from "react";
import "./ChessTable.css";
import Square from "./Square";
const numbers: number[] = [];
for (let i = 1; i < 65; i++) {
  numbers.push(i);
}

const initialTable = {
  1: "rook",
  2: "knight",
  3: "bishop",
  4: "queen",
  9: "pawn",
  10: "pawn",
  11: "pawn",
  12: "pawn",
  13: "pawn",
  14: "pawn",
  15: "pawn",
  16: "pawn",
};

const ChessTable = () => {
  const [table, setTable] = useState(initialTable);
  const [active, setActive] = useState();

  function clickHandler(value: any) {
    setActive(value);
  }

  useEffect(() => {
    console.log(active);
  }, [active]);

  return (
    <div
      id="table"
      className="flex flex-wrap items-center justify-center w-[650px] m-auto"
    >
      {numbers.map((number) => (
        <Square
          key={number}
          id={number}
          clickHandler={clickHandler}
          active={active}
          table={table}
        />
      ))}
    </div>
  );
};

export default ChessTable;
