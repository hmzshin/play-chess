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
import { socket } from "../../socket";
import { TableContextObject } from "../context/TableContext";

type Table = Record<number, string>;

type PieceType =
  | "King"
  | "Queen"
  | "Bishop"
  | "King"
  | "Pawn"
  | "Knight"
  | "Rook"
  | string;
interface Move {
  id: number;
  piece: PieceType;
}

interface ChessTableProps {
  username: string;
  room: string;
  turn: string;
  isMyTurn: boolean;
  setIsMyTurn: Function;
}
const ChessTable: React.FC<ChessTableProps> = ({
  username,
  room,
  turn,
  isMyTurn,
  setIsMyTurn,
}) => {
  const [active, setActive] = useState<number>(0);
  const [click, setClick] = useState<{
    fisrtClick: boolean;
    secondClick: boolean;
  }>({
    fisrtClick: false,
    secondClick: false,
  });
  const [move, setMove] = useState<Move>({
    id: 0,
    piece: "",
  });
  const [pawn] = usePawn(move);
  const [rook] = useRook(move);
  const [knight] = useKnight(move);
  const [queen] = useQueen(move);
  const [king] = useKing(move);
  const [bishop] = useBishop(move);
  const { possibleMoves, dispatchPossibleMoves } = useContext(
    PossibleMovesContextObject
  );
  const [isMoved, setIsMoved] = useState<boolean>(false);

  const { table, dispatchTable } = useContext(TableContextObject);

  function clickHandler(value: number) {
    setActive(value);
    if (table[value] !== "empty") {
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
    if (click.fisrtClick === true) {
      setMove({ id: active, piece: table[active] });
    } else if (
      click.secondClick === true &&
      possibleMoves.includes(active) &&
      isMyTurn
    ) {
      const copy: Table = { ...table };
      copy[move.id] = "empty";
      copy[active] = move.piece;
      dispatchTable({ type: "SET_TABLE", payload: copy });
      const data = {
        username: username,
        room: room,
        table: copy,
      };
      socket.emit("sendMove", data);
      setIsMyTurn(false);
      if (!isMoved) {
        setIsMoved(true);
      }
      dispatchPossibleMoves({ type: "RESET_POSSIBLE_MOVES" });
    } else if (
      click.secondClick === true &&
      possibleMoves.includes(active) &&
      !isMyTurn
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
      pawn({ ...move });
    } else if (move.piece.includes("Rook")) {
      rook({ ...move });
    } else if (move.piece.includes("Knight")) {
      knight({ ...move });
    } else if (move.piece.includes("Bishop")) {
      bishop({ ...move });
    } else if (move.piece.includes("Queen")) {
      queen({ ...move });
    } else if (move.piece.includes("King")) {
      king({ ...move });
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
      <Timer turn={turn} isMyTurn={isMyTurn} isMoved={isMoved} />
    </div>
  );
};

export default ChessTable;
