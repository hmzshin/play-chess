import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Timer from "./Timer";
import "./ChessTable.css";
import { initialTable, numbers } from "../data";
import Square from "./Square";
import usePawn from "../hooks/usePawn";
import useRook from "../hooks/useRook";
import useKnight from "../hooks/useKnight";
import useBishop from "../hooks/useBishop";
import useQueen from "../hooks/useQueen";
import useKing from "../hooks/useKing";
import { PossibleMovesContextObject } from "../context/PossibleMovesContext";

const ChessTable = () => {
  const [table, setTable] = useState(initialTable);
  const [active, setActive] = useState("");
  const [click, setClick] = useState({ fisrtClick: false, secondClick: false });
  const [move, setMove] = useState({ id: "", piece: "" });
  const [pawn] = usePawn(move);
  const [rook] = useRook(move);
  const [knight] = useKnight(move);
  const [queen] = useQueen(move);
  const [king] = useKing(move);
  const [bishop] = useBishop(move);
  const [turn, setTurn] = useState("white");
  const { possibleMoves, dispatchPossibleMoves }: any = useContext(
    PossibleMovesContextObject
  );
  const [isMoved, setIsMoved] = useState(false);
  function clickHandler(value: any) {
    setActive(value);
    if (table[value] != "empty") {
      if (possibleMoves.includes(value)) {
        setClick({ fisrtClick: false, secondClick: true });
      } else {
        setClick({ fisrtClick: true, secondClick: false });
      }
    } else {
      setClick({ fisrtClick: false, secondClick: true });
    }
  }

  useEffect(() => {
    if (click.fisrtClick == true) {
      setMove({ id: active, piece: table[active] });
    } else if (
      click.secondClick == true &&
      possibleMoves.includes(active) &&
      move.piece.includes(turn)
    ) {
      const copy = { ...table };
      copy[move.id] = "empty";
      copy[active] = move.piece;
      setTable(copy);
      if (isMoved == false) {
        setIsMoved(true);
      }

      dispatchPossibleMoves({ type: "RESET_POSSIBLE_MOVES" });
      setTurn(turn == "white" ? "black" : "white");
    } else if (
      click.secondClick == true &&
      possibleMoves.includes(active) &&
      !move.piece.includes(turn)
    ) {
      toast.warn(`It's ${turn} turn`);
      dispatchPossibleMoves({ type: "RESET_POSSIBLE_MOVES" });
    } else {
      dispatchPossibleMoves({ type: "RESET_POSSIBLE_MOVES" });
    }

    console.log("turn", turn);
  }, [click]);

  useEffect(() => {
    if (move.piece.includes("Pawn")) {
      pawn({ ...move, table: table });
    } else if (move.piece.includes("Rook")) {
      rook({ ...move, table: table });
    } else if (move.piece.includes("Knight")) {
      knight({ ...move, table: table });
    } else if (move.piece.includes("Bishop")) {
      bishop({ ...move, table: table });
    } else if (move.piece.includes("Queen")) {
      queen({ ...move, table: table });
    } else if (move.piece.includes("King")) {
      king({ ...move, table: table });
    }
  }, [move]);

  return (
    <div className="flex items-center justify-center flex-wrap gap-20 p-[5%]">
      <div
        id="table"
        className="flex flex-wrap items-center justify-center w-[350px] md:w-[650px]"
      >
        {numbers.map((number) => (
          <Square
            key={number}
            id={number}
            clickHandler={clickHandler}
            active={active}
            table={table}
            possible={possibleMoves}
          />
        ))}
      </div>
      <Timer turn={turn} isMoved={isMoved} />
    </div>
  );
};

export default ChessTable;
