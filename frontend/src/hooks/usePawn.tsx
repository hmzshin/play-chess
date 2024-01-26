import React, { useContext, useEffect, useState } from "react";
import { PossibleMovesContextObject } from "../context/PossibleMovesContext";
import { TableContextObject } from "../context/TableContext";

type PieceType = "Pawn" | string;
type SquareType = "empty" | string;
type Table = Record<number, string>;

interface PawnState {
  id: number;
  piece: PieceType;
}

const usePawn = (initialValue: PawnState) => {
  const [state, setState] = useState<PawnState>(initialValue);
  const { dispatchPossibleMoves } = useContext(PossibleMovesContextObject);
  const { table } = useContext(TableContextObject);

  const findEmptySquares = (array: [number, SquareType][]): number[] => {
    const newArray: number[] = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i][1] === "empty") {
        newArray.push(array[i][0]);
      }
    }
    return newArray;
  };

  useEffect(() => {
    if (state.piece.includes("Pawn")) {
      console.log(`${table[state.id]} is selected`);
      let possibleMove: number[] = [];
      const possibleTakes: number[] = [];
      const copy = { ...state };
      if (state.piece.includes("white")) {
        if ([49, 50, 51, 52, 53, 54, 55, 56].includes(state.id)) {
          possibleMove.push(copy.id - 8);
          possibleMove.push(copy.id - 16);
        } else {
          possibleMove.push(copy.id - 8);
        }
        if ([56, 48, 40, 32, 24, 16].includes(copy.id)) {
          possibleTakes.push(copy.id - 9);
        } else if ([49, 41, 33, 25, 17, 9].includes(copy.id)) {
          possibleTakes.push(copy.id - 7);
        } else {
          possibleTakes.push(copy.id - 9);
          possibleTakes.push(copy.id - 7);
        }
        var takes = possibleTakes.filter((square) =>
          table[square].includes("black")
        );
      } else {
        if ([9, 10, 11, 12, 13, 14, 15, 16].includes(state.id)) {
          possibleMove.push(copy.id + 8);
          possibleMove.push(copy.id + 16);
        } else {
          possibleMove.push(copy.id + 8);
        }

        if ([56, 48, 40, 32, 24, 16].includes(copy.id)) {
          possibleTakes.push(copy.id + 7);
        } else if ([49, 41, 33, 25, 17, 9].includes(copy.id)) {
          possibleTakes.push(copy.id + 9);
        } else {
          possibleTakes.push(copy.id + 9);
          possibleTakes.push(copy.id + 7);
        }

        var takes = possibleTakes.filter((square) =>
          table[square].includes("white")
        );
      }

      const possibleMoves = findEmptySquares(
        possibleMove.map((square) =>
          table[square] === "empty"
            ? [square, "empty"]
            : [square, table[square]]
        )
      );
      const final = [...possibleMoves, ...takes];
      dispatchPossibleMoves({
        type: "SET_POSSIBLE_MOVES",
        payload: final,
      });
    }
  }, [state, dispatchPossibleMoves]);

  function changeHandler(val: PawnState) {
    setState(val);
  }

  return [changeHandler] as const;
};

export default usePawn;
