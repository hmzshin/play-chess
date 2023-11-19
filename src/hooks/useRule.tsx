import React, { useEffect, useState } from "react";
const initialArr: any = [];
const numbers: number[] = [];
for (let i = 1; i < 65; i++) {
  numbers.push(i);
}

const useRule = (initalValue: any) => {
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

  useEffect(() => {
    if (state.piece == "whitePawn") {
      const copy = { ...state };
      console.log(`${state.table[state.id]} seçildi`);
      setPossibleSquares([copy.id - 8, copy.id - 16]);
    }

    if (state.piece == "whiteRook") {
      const copy = { ...state };
      const squaresX = [];
      let possibleY: number[] = [];

      for (let i = 1; i < 8; i++) {
        squaresX.push(i * 8);
      }

      const possibleX = [...squaresX].map((square: any) => {
        return (copy.id + square) % 64 == 0 ? 64 : (copy.id + square) % 64;
      });

      if (state.id <= 8) {
        possibleY = [1, 2, 3, 4, 5, 6, 7, 8].filter(
          (square) => state.id != square
        );
      } else if (state.id <= 16) {
        possibleY = [1, 2, 3, 4, 5, 6, 7, 8]
          .map((number) => number + 8)
          .filter((square) => state.id != square);
      } else if (state.id <= 24) {
        possibleY = [1, 2, 3, 4, 5, 6, 7, 8]
          .map((number) => number + 16)
          .filter((square) => state.id != square);
      } else if (state.id <= 32) {
        possibleY = [1, 2, 3, 4, 5, 6, 7, 8]
          .map((number) => number + 24)
          .filter((square) => state.id != square);
      } else if (state.id <= 40) {
        possibleY = [1, 2, 3, 4, 5, 6, 7, 8]
          .map((number) => number + 32)
          .filter((square) => state.id != square);
      } else if (state.id <= 48) {
        possibleY = [1, 2, 3, 4, 5, 6, 7, 8]
          .map((number) => number + 40)
          .filter((square) => state.id != square);
      } else if (state.id <= 56) {
        possibleY = [1, 2, 3, 4, 5, 6, 7, 8]
          .map((number) => number + 48)
          .filter((square) => state.id != square);
      } else {
        possibleY = [1, 2, 3, 4, 5, 6, 7, 8]
          .map((number) => number + 56)
          .filter((square) => state.id != square);
      }

      const possibleSquaresOnRight = findEmptySquares(
        possibleY
          .filter((square) => square > state.id)
          .sort((a, b) => a - b)
          .map((square) =>
            state.table[square] == "empty"
              ? [square, "empty"]
              : [square, state.table[square]]
          )
      );

      console.log("right side", possibleSquaresOnRight);

      const possibleSquaresOnLeft = findEmptySquares(
        possibleY
          .filter((square) => square < state.id)
          .sort((a, b) => b - a)
          .map((square) =>
            state.table[square] == "empty"
              ? [square, "empty"]
              : [square, state.table[square]]
          )
      );
      console.log("left side", possibleSquaresOnLeft);

      const possibleSquaresOnUP = findEmptySquares(
        possibleX
          .filter((square) => square < state.id)
          .sort((a, b) => b - a)
          .map((square) =>
            state.table[square] == "empty"
              ? [square, "empty"]
              : [square, state.table[square]]
          )
      );
      console.log("up side", possibleSquaresOnUP);

      const possibleSquaresOnDown = findEmptySquares(
        possibleX
          .filter((square) => square > state.id)
          .sort((a, b) => a - b)
          .map((square) =>
            state.table[square] == "empty"
              ? [square, "empty"]
              : [square, state.table[square]]
          )
      );
      console.log("down side", possibleSquaresOnDown);

      const possibleOnX = [
        ...possibleSquaresOnLeft,
        ...possibleSquaresOnRight,
        ...possibleSquaresOnDown,
        ...possibleSquaresOnUP,
      ];

      setPossibleSquares(possibleOnX);
    }
  }, [state]);

  useEffect(() => {}, [possibleSquares]);

  function changeHandler(val: object) {
    setState(val);
  }

  return [possibleSquares, changeHandler];
};

export default useRule;
