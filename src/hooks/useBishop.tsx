import React, { useContext, useEffect, useState } from "react";
const initialArr: any = [];
const numbers: number[] = [];
for (let i = 1; i < 65; i++) {
  numbers.push(i);
}

import { chessboard } from "../data";
import { PossibleMovesContextObject } from "../context/PossibleMovesContext";

const useBishop = (initalValue: any) => {
  const [state, setState] = useState(initalValue);
  const { dispatchPossibleMoves }: any = useContext(PossibleMovesContextObject);

  const findEmptySquares = (array: any) => {
    const newArray: string[] = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i][1] == "empty") {
        newArray.push(array[i][0]);
      } else {
        if (array[i][1].includes("black") && state.piece.includes("white")) {
          console.log("önümde siyah taş var", state.piece);
          newArray.push(array[i][0]);
          return newArray;
        } else if (
          array[i][1].includes("white") &&
          state.piece.includes("black")
        ) {
          console.log("önümde beyaz taş var", state.piece);
          newArray.push(array[i][0]);
          return newArray;
        }
        return newArray;
      }
    }
    return newArray;
  };

  const coordinateToIndex = (array: number[]) => {
    return array.map((coordinate: any) => {
      for (const key in chessboard) {
        if (
          coordinate[0] == chessboard[key][0] &&
          coordinate[1] == chessboard[key][1]
        )
          return Number(key);
      }
    });
  };
  useEffect(() => {
    if (state.piece.includes("Bishop")) {
      console.log(`${state.table[state.id]} seçildi`);

      let x = chessboard[state.id][0];
      let y = chessboard[state.id][1];

      const southEast: any[] = [];
      const southWest: any[] = [];
      const northEast: any[] = [];
      const northWest: any[] = [];
      let x1 = x;
      let y1 = y;
      let x2 = x;
      let y2 = y;
      let x3 = x;
      let y3 = y;
      let x4 = x;
      let y4 = y;

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
        coordinateToIndex(southEast).map((square: any) =>
          state.table[square] == "empty"
            ? [square, "empty"]
            : [square, state.table[square]]
        )
      );
      const possibleNorthEast = findEmptySquares(
        coordinateToIndex(northEast).map((square: any) =>
          state.table[square] == "empty"
            ? [square, "empty"]
            : [square, state.table[square]]
        )
      );

      const possibleSouthWest = findEmptySquares(
        coordinateToIndex(southWest).map((square: any) =>
          state.table[square] == "empty"
            ? [square, "empty"]
            : [square, state.table[square]]
        )
      );
      const possibleNorthWest = findEmptySquares(
        coordinateToIndex(northWest).map((square: any) =>
          state.table[square] == "empty"
            ? [square, "empty"]
            : [square, state.table[square]]
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
  }, [state]);
  function updateState(value: any) {
    setState(value);
  }

  return [updateState];
};

export default useBishop;
