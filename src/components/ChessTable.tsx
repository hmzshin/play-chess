import React, { useEffect, useState } from "react";
import "./ChessTable.css";
import { initialTable, numbers } from "../data";
import Square from "./Square";
import usePawn from "../hooks/usePawn";
import useRook from "../hooks/useRook";
import useKnight from "../hooks/useKnight";
import useBishop from "../hooks/useBishop";
import useQueen from "../hooks/useQueen";
import useKing from "../hooks/useKing";

const ChessTable = () => {
  const [table, setTable] = useState(initialTable);
  const [active, setActive] = useState("");
  const [click, setClick] = useState({ fisrtClick: false, secondClick: false });
  const [move, setMove] = useState({ id: "", piece: "" });
  const [possibleSquares, setPossibleSquares] = useState("");
  const [pawn, setPawn] = usePawn(move);
  const [rook, setRook] = useRook(move);
  const [knight, setKnight] = useKnight(move);
  const [bishop, setBishop] = useBishop(move);
  const [queen, setQueen] = useQueen(move);
  const [king, setKing] = useKing(move);

  function clickHandler(value: any) {
    setActive(value);
    if (table[value] != "empty") {
      if (possibleSquares.includes(value)) {
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
    }

    if (click.secondClick == true && possibleSquares.includes(active)) {
      const copy = { ...table };
      copy[move.id] = "empty";
      copy[active] = move.piece;
      setTable(copy);
      setPossibleSquares("");
    }
    console.log(click, active);
  }, [click]);

  useEffect(() => {
    if (move.piece.includes("Pawn")) {
      setPawn({ ...move, table: table });
    } else if (move.piece.includes("Rook")) {
      setRook({ ...move, table: table });
    } else if (move.piece.includes("Knight")) {
      setKnight({ ...move, table: table });
    } else if (move.piece.includes("Bishop")) {
      setBishop({ ...move, table: table });
    } else if (move.piece.includes("Queen")) {
      setQueen({ ...move, table: table });
    } else if (move.piece.includes("King")) {
      setKing({ ...move, table: table });
    }
  }, [move]);

  useEffect(() => {
    setPossibleSquares(rook);
  }, [rook]);

  useEffect(() => {
    setPossibleSquares(pawn);
  }, [pawn]);

  useEffect(() => {
    setPossibleSquares(knight);
  }, [knight]);

  useEffect(() => {
    setPossibleSquares(bishop);
  }, [bishop]);

  useEffect(() => {
    setPossibleSquares(queen);
  }, [queen]);

  useEffect(() => {
    setPossibleSquares(king);
  }, [king]);

  useEffect(() => {
    console.log("bu kareye gidebilir", possibleSquares);
  }, [possibleSquares]);

  return (
    <div
      id="table"
      className="flex flex-wrap items-center justify-center w-[650px] m-auto pt-20"
    >
      {numbers.map((number) => (
        <Square
          key={number}
          id={number}
          clickHandler={clickHandler}
          active={active}
          table={table}
          possible={possibleSquares}
        />
      ))}
    </div>
  );
};

export default ChessTable;
