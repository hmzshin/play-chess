import React, { useContext, useEffect, useState } from "react";
import { PossibleMovesContextObject } from "../context/PossibleMovesContext";
import { chessboard } from "../data";
import { TableContextObject } from "../context/TableContext";

type PieceType = "Bishop" | string;
type SquareType = "empty" | string;
type Coordinate = [number, number];
interface BishopState {
  id: number;
  piece: PieceType;
}

const useBishop = (initialValue: BishopState) => {
  const [state, setState] = useState<BishopState>(initialValue);
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
          return newArray;
        } else if (
          array[i][1].includes("white") &&
          state.piece.includes("black")
        ) {
          console.log("There is a white piece in front of me", state.piece);
          newArray.push(array[i][0]);
          return newArray;
        }
        return newArray;
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
    if (state.piece.includes("Bishop")) {
      console.log(`${table[state.id]} is selected`);

      let x = chessboard[state.id][0];
      let y = chessboard[state.id][1];

      const southEast: Coordinate[] = [];
      const southWest: Coordinate[] = [];
      const northEast: Coordinate[] = [];
      const northWest: Coordinate[] = [];
      let x1: number = x;
      let y1: number = y;
      let x2: number = x;
      let y2: number = y;
      let x3: number = x;
      let y3: number = y;
      let x4: number = x;
      let y4: number = y;

      while (x1 < 8 && y1 < 8) {
        x1 = x1 + 1;
        y1 = y1 + 1;
        southEast.push([x1, y1]);
      }

      while (x2 < 8 && y2 > 1) {
        x2 = x2 + 1;
        y2 = y2 - 1;
        southWest.push([x2, y2]);
      }
      while (x3 > 1 && y3 < 8) {
        x3 = x3 - 1;
        y3 = y3 + 1;
        northEast.push([x3, y3]);
      }
      while (x4 > 1 && y4 > 1) {
        x4 = x4 - 1;
        y4 = y4 - 1;
        northWest.push([x4, y4]);
      }

      const possibleSouthEast = findEmptySquares(
        coordinateToIndex(southEast).map((square) =>
          table[square] === "empty"
            ? [square, "empty"]
            : [square, table[square]]
        )
      );
      const possibleNorthEast = findEmptySquares(
        coordinateToIndex(northEast).map((square) =>
          table[square] === "empty"
            ? [square, "empty"]
            : [square, table[square]]
        )
      );

      const possibleSouthWest = findEmptySquares(
        coordinateToIndex(southWest).map((square) =>
          table[square] === "empty"
            ? [square, "empty"]
            : [square, table[square]]
        )
      );
      const possibleNorthWest = findEmptySquares(
        coordinateToIndex(northWest).map((square) =>
          table[square] === "empty"
            ? [square, "empty"]
            : [square, table[square]]
        )
      );
      const possibleMoves = [
        ...possibleNorthEast,
        ...possibleNorthWest,
        ...possibleSouthEast,
        ...possibleSouthWest,
      ];
      dispatchPossibleMoves({
        type: "SET_POSSIBLE_MOVES",
        payload: possibleMoves,
      });
    }
  }, [state, dispatchPossibleMoves]);

  function updateState(value: BishopState) {
    setState(value);
  }

  return [updateState] as const;
};

export default useBishop;
