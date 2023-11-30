import React, { useEffect, useState } from "react";
const initialArr: any = [];

import { chessboard } from "../data";

const useQueen = (initalValue: any) => {
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
    if (state.piece.includes("Queen")) {
      console.log(`${state.table[state.id]} seçildi`);

      let x = chessboard[state.id][0];
      let y = chessboard[state.id][1];
      const south: any[] = [];
      const west: any[] = [];
      const north: any[] = [];
      const east: any[] = [];
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
      let x5 = x;
      let y5 = y;
      let x6 = x;
      let y6 = y;
      let x7 = x;
      let y7 = y;
      let x9 = x;
      let y9 = y;

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

      while (x5 < 8) {
        x5 = x5 + 1;
        south.push([x5, y5]);
      }

      while (x6 > 1) {
        x6 = x6 - 1;
        north.push([x6, y6]);
      }
      while (y7 < 8) {
        y7 = y7 + 1;
        east.push([x7, y7]);
      }
      while (y9 > 1) {
        y9 = y9 - 1;
        west.push([x9, y9]);
      }

      const combinedDirections = [
        north,
        south,
        east,
        west,
        northEast,
        northWest,
        southEast,
        southWest,
      ];

      const possibleMoves = combinedDirections
        .map((direction) =>
          findEmptySquares(
            coordinateToIndex(direction).map((square: any) =>
              state.table[square] == "empty"
                ? [square, "empty"]
                : [square, state.table[square]]
            )
          )
        )
        .reduce((combinedArray, array) => [...combinedArray, ...array]);

      setPossibleSquares(possibleMoves);
    }
  }, [state]);

  function changeHandler(val: object) {
    setState(val);
  }

  return [possibleSquares, changeHandler];
};

export default useQueen;
