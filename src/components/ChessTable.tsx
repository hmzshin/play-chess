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
  5: "king",
  6: "bishop",
  7: "knight",
  8: "rook",
  9: "pawn",
  10: "pawn",
  11: "pawn",
  12: "pawn",
  13: "pawn",
  14: "pawn",
  15: "pawn",
  16: "pawn",
  17: "empty",
  18: "empty",
  19: "empty",
  20: "empty",
  21: "empty",
  22: "empty",
  23: "empty",
  24: "empty",
  25: "empty",
  26: "empty",
  27: "empty",
  28: "empty",
  29: "empty",
  30: "empty",
  31: "empty",
  32: "empty",
  33: "empty",
  34: "empty",
  35: "empty",
  36: "empty",
  37: "empty",
  38: "empty",
  39: "empty",
  40: "empty",
  41: "empty",
  42: "empty",
  43: "empty",
  44: "empty",
  45: "empty",
  46: "empty",
  47: "empty",
  48: "empty",
  49: "pawn",
  50: "pawn",
  51: "pawn",
  52: "pawn",
  53: "pawn",
  54: "pawn",
  55: "pawn",
  56: "pawn",
  57: "rook",
  58: "knight",
  59: "bishop",
  60: "queen",
  61: "king",
  62: "bishop",
  63: "knight",
  64: "rook",
};

const ChessTable = () => {
  const [table, setTable] = useState(initialTable);
  const [active, setActive] = useState("");
  const [click, setClick] = useState({ fisrtClick: false, secondClick: false });
  const [move, setMove] = useState({ key: "", value: "" });

  function clickHandler(value: any) {
    setActive(value);
    if (table[value] != "empty") {
      setClick({ fisrtClick: true, secondClick: false });
    }
    if (click.fisrtClick == true) {
      setClick({ fisrtClick: false, secondClick: true });
    }
  }

  useEffect(() => {
    if (click.fisrtClick == true && table[active]) {
      setMove({ key: active, value: table[active] });
    }
    if (click.secondClick == true) {
      const copy = { ...table };
      copy[move.key] = "empty";
      copy[active] = move.value;
      setTable(copy);
    }
    console.log(click);
  }, [click]);

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
          click={click}
        />
      ))}
    </div>
  );
};

export default ChessTable;
