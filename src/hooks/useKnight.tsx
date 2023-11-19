import React, { useEffect, useState } from "react";
const initialArr: any = [];
const numbers: number[] = [];
for (let i = 1; i < 65; i++) {
  numbers.push(i);
}
const chessboard = {};
let count = 1;
for (let i = 1; i < 9; i++) {
  for (let j = 1; j < 9; j++) {
    chessboard[count] = [i, j];
    count++;
  }
}

const useKnight = (initalValue: any) => {
  const [state, setState] = useState(initalValue);
  const [possibleSquares, setPossibleSquares] = useState(initialArr);

  const findEmptySquares = (array: any) => {
    const newArray: number[] = [];

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

  useEffect(() => {
    if (state.piece.includes("Knight")) {
      console.log(`${state.table[state.id]} seçildi`);

      let x = chessboard[state.id][0];
      let y = chessboard[state.id][1];

      const move1X = x + 2;
      const move1Y = y + 1;
      const move1 = [move1X, move1Y];

      const move2X = x + 2;
      const move2Y = y - 1;
      let move2 = [move2X, move2Y];

      const move3X = x - 2;
      const move3Y = y + 1;
      let move3 = [move3X, move3Y];

      const move4X = x - 2;
      const move4Y = y - 1;
      let move4 = [move4X, move4Y];

      const move5X = x + 1;
      const move5Y = y + 2;
      let move5 = [move5X, move5Y];

      const move6X = x - 1;
      const move6Y = y + 2;
      let move6 = [move6X, move6Y];

      const move7X = x + 1;
      const move7Y = y - 2;
      let move7 = [move7X, move7Y];

      const move8X = x - 1;
      const move8Y = y - 2;
      let move8 = [move8X, move8Y];

      const moves = [move1, move2, move3, move4, move5, move6, move7, move8];

      const possibleMoves = moves
        .filter(
          (move) => move[0] >= 1 && move[0] <= 8 && move[1] >= 1 && move[1] <= 8
        )
        .map((coordinate) => {
          for (const key in chessboard) {
            if (
              coordinate[0] == chessboard[key][0] &&
              coordinate[1] == chessboard[key][1]
            )
              return Number(key);
          }
        });

      //   console.log("possbile moves", possibleMoves);

      const filterPossibleMove = findEmptySquares(
        possibleMoves.map((square: any) =>
          state.table[square] == "empty"
            ? [square, "empty"]
            : [square, state.table[square]]
        )
      );

      setPossibleSquares(filterPossibleMove);
    }
  }, [state]);

  function changeHandler(val: object) {
    setState(val);
  }

  return [possibleSquares, changeHandler];
};

export default useKnight;
