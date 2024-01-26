import React, { useContext, useEffect, useState } from "react";
import { chessboard } from "../data";
import { PossibleMovesContextObject } from "../context/PossibleMovesContext";

type PieceType = "Knight" | string;
type SquareType = "empty" | string;
type Coordinate = [number, number];
type Table = Record<number, string>;

interface KnightState {
  id: number;
  table: Table;
  piece: PieceType;
}

const useKnight = (initialValue: KnightState) => {
  const [state, setState] = useState<KnightState>(initialValue);
  const { dispatchPossibleMoves } = useContext(PossibleMovesContextObject);

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

  useEffect(() => {
    if (state.piece.includes("Knight")) {
      console.log(`${state.table[state.id]} is selected`);

      let x = chessboard[state.id][0];
      let y = chessboard[state.id][1];

      const move1X = x + 2;
      const move1Y = y + 1;
      const move1: Coordinate = [move1X, move1Y];

      const move2X = x + 2;
      const move2Y = y - 1;
      const move2: Coordinate = [move2X, move2Y];

      const move3X = x - 2;
      const move3Y = y + 1;
      const move3: Coordinate = [move3X, move3Y];

      const move4X = x - 2;
      const move4Y = y - 1;
      const move4: Coordinate = [move4X, move4Y];

      const move5X = x + 1;
      const move5Y = y + 2;
      const move5: Coordinate = [move5X, move5Y];

      const move6X = x - 1;
      const move6Y = y + 2;
      const move6: Coordinate = [move6X, move6Y];

      const move7X = x + 1;
      const move7Y = y - 2;
      const move7: Coordinate = [move7X, move7Y];

      const move8X = x - 1;
      const move8Y = y - 2;
      const move8: Coordinate = [move8X, move8Y];

      const moves: Coordinate[] = [
        move1,
        move2,
        move3,
        move4,
        move5,
        move6,
        move7,
        move8,
      ];

      const possibleMoves = moves
        .filter(
          (move) => move[0] >= 1 && move[0] <= 8 && move[1] >= 1 && move[1] <= 8
        )
        .map((coordinate) => {
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

      const filterPossibleMove = findEmptySquares(
        possibleMoves.map((square: any) =>
          state.table[square] === "empty"
            ? [square, "empty"]
            : [square, state.table[square]]
        )
      );
      dispatchPossibleMoves({
        type: "SET_POSSIBLE_MOVES",
        payload: filterPossibleMove,
      });
    }
  }, [state, dispatchPossibleMoves]);

  function changeHandler(val: KnightState) {
    setState(val);
  }

  return [changeHandler] as const;
};

export default useKnight;
