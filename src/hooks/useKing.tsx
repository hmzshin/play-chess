import React, { useEffect, useState } from "react";
const initialArr: any = [];
import { chessboard } from "../data";

const useKing = (initalValue: any) => {
  const [state, setState] = useState(initalValue);
  const [possibleSquares, setPossibleSquares] = useState(initialArr);

  const findEmptySquares = (array: any) => {
    const newArray: string[] = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i][1] == "empty") {
        newArray.push(array[i][0]);
      } else {
        if (array[i][1].includes("black") && state.piece.includes("white")) {
          console.log("önümde siyah taş var", state.piece);
          newArray.push(array[i][0]);
        } else if (
          array[i][1].includes("white") &&
          state.piece.includes("black")
        ) {
          console.log("önümde beyaz taş var", state.piece);
          newArray.push(array[i][0]);
        }
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
    if (state.piece.includes("King")) {
      console.log(`${state.table[state.id]} seçildi`);

      let x = chessboard[state.id][0];
      let y = chessboard[state.id][1];
      const moves: any[] = [];
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
          state.table[square] == "empty"
            ? [square, "empty"]
            : [square, state.table[square]]
        )
      );

      setPossibleSquares(possibleMoves);
    }
  }, [state]);

  function changeHandler(val: object) {
    setState(val);
  }

  return [possibleSquares, changeHandler];
};

export default useKing;
