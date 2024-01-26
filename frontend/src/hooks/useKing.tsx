import React, { useContext, useEffect, useState } from "react";
import { chessboard } from "../data";
import { PossibleMovesContextObject } from "../context/PossibleMovesContext";
import { TableContextObject } from "../context/TableContext";

type PieceType = "King" | string;
type SquareType = "empty" | string;
type Coordinate = [number, number];

interface KingState {
  id: number;
  piece: PieceType;
}

const useKing = (initialValue: KingState) => {
  const [state, setState] = useState<KingState>(initialValue);
  const { dispatchPossibleMoves } = useContext(PossibleMovesContextObject);
  const { table } = useContext(TableContextObject);

  const findEmptySquares = (array: [number, SquareType][]): number[] => {
    const newArray: number[] = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i][1] === "empty") {
        newArray.push(array[i][0]);
      } else {
        if (array[i][1].includes("black") && state.piece.includes("white")) {
          console.log("There is a black piece in front of me", state.piece);
          newArray.push(array[i][0]);
        } else if (
          array[i][1].includes("white") &&
          state.piece.includes("black")
        ) {
          console.log("There is a white piece in front of me", state.piece);
          newArray.push(array[i][0]);
        }
      }
    }
    return newArray;
  };

  const coordinateToIndex = (array: Coordinate[]): number[] => {
    return array.map((coordinate) => {
      for (const key in chessboard) {
        if (
          coordinate[0] === chessboard[key][0] &&
          coordinate[1] === chessboard[key][1]
        ) {
          return Number(key);
        }
      }
      return -1;
    });
  };

  useEffect(() => {
    if (state.piece.includes("King")) {
      console.log(`${table[state.id]} is selected`);

      let x = chessboard[state.id][0];
      let y = chessboard[state.id][1];
      const moves: Coordinate[] = [];
      let x1 = x + 1;
      let y1 = y + 1;
      let x2 = x + 1;
      let y2 = y - 1;
      let x3 = x - 1;
      let y3 = y + 1;
      let x4 = x - 1;
      let y4 = y - 1;
      let x5 = x + 1;
      let y5 = y;
      let x6 = x - 1;
      let y6 = y;
      let x7 = x;
      let y7 = y + 1;
      let x9 = x;
      let y9 = y - 1;

      if (x1 <= 8 && y1 <= 8) {
        moves.push([x1, y1]);
      }

      if (x2 <= 8 && y2 >= 1) {
        moves.push([x2, y2]);
      }
      if (x3 >= 1 && y3 <= 8) {
        moves.push([x3, y3]);
      }
      if (x4 >= 1 && y4 >= 1) {
        moves.push([x4, y4]);
      }

      if (x5 <= 8) {
        moves.push([x5, y5]);
      }

      if (x6 >= 1) {
        moves.push([x6, y6]);
      }
      if (y7 <= 8) {
        moves.push([x7, y7]);
      }
      if (y9 >= 1) {
        moves.push([x9, y9]);
      }

      const possibleMoves = findEmptySquares(
        coordinateToIndex(moves).map((square: any) =>
          table[square] === "empty"
            ? [square, "empty"]
            : [square, table[square]]
        )
      );
      dispatchPossibleMoves({
        type: "SET_POSSIBLE_MOVES",
        payload: possibleMoves,
      });
    }
  }, [state, dispatchPossibleMoves]);

  function changeHandler(val: KingState) {
    setState(val);
  }

  return [changeHandler] as const;
};

export default useKing;
