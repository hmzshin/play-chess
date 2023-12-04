import React, { useContext, useEffect, useState } from "react";
import { PossibleMovesContextObject } from "../context/PossibleMovesContext";
const initialArr: any = [];
const numbers: number[] = [];
for (let i = 1; i < 65; i++) {
  numbers.push(i);
}

const usePawn = (initalValue: any) => {
  const [state, setState] = useState(initalValue);
  const { dispatchPossibleMoves }: any = useContext(PossibleMovesContextObject);

  const findEmptySquares = (array: any) => {
    const newArray: string[] = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i][1] == "empty") {
        newArray.push(array[i][0]);
      }
    }
    return newArray;
  };

  // çapraz yeme kuralı ekle
  // bir birim ileri sonra sağ ve sola hareket
  // eğer bu karelerde karşı tarafın taşı varsa hareket et
  useEffect(() => {
    if (state.piece.includes("Pawn")) {
      console.log(`${state.table[state.id]} seçildi`);
      let possibleMove: any[] = [];
      const possibleTakes: any[] = [];
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
          state.table[square].includes("black")
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
          state.table[square].includes("white")
        );
      }

      const possibleMoves = findEmptySquares(
        possibleMove.map((square) =>
          state.table[square] == "empty"
            ? [square, "empty"]
            : [square, state.table[square]]
        )
      );
      const final = [...possibleMoves, ...takes];
      dispatchPossibleMoves({
        type: "SET_POSSIBLE_MOVES",
        payload: final,
      });
    }
  }, [state]);

  function changeHandler(val: object) {
    setState(val);
  }

  return [changeHandler];
};

export default usePawn;
