export const chessboard = {};
let count = 1;
for (let i = 1; i < 9; i++) {
  for (let j = 1; j < 9; j++) {
    chessboard[count] = [i, j];
    count++;
  }
}

export const initialTable = {
  1: "blackRook",
  2: "blackKnight",
  3: "blackBishop",
  4: "blackQueen",
  5: "blackKing",
  6: "blackBishop",
  7: "blackKnight",
  8: "blackRook",
  9: "blackPawn",
  10: "blackPawn",
  11: "blackPawn",
  12: "blackPawn",
  13: "blackPawn",
  14: "blackPawn",
  15: "blackPawn",
  16: "blackPawn",
  17: "empty",
  18: "empty",
  19: "empty",
  20: "empty",
  21: "empty",
  22: "empty",
  23: "empty",
  24: "empty",
  25: "empty",
  26: "empty",
  27: "empty",
  28: "empty",
  29: "empty",
  30: "empty",
  31: "empty",
  32: "empty",
  33: "empty",
  34: "empty",
  35: "empty",
  36: "empty",
  37: "empty",
  38: "empty",
  39: "empty",
  40: "empty",
  41: "empty",
  42: "empty",
  43: "empty",
  44: "empty",
  45: "empty",
  46: "empty",
  47: "empty",
  48: "empty",
  49: "whitePawn",
  50: "whitePawn",
  51: "whitePawn",
  52: "whitePawn",
  53: "whitePawn",
  54: "whitePawn",
  55: "whitePawn",
  56: "whitePawn",
  57: "whiteRook",
  58: "whiteKnight",
  59: "whiteBishop",
  60: "whiteQueen",
  61: "whiteKing",
  62: "whiteBishop",
  63: "whiteKnight",
  64: "whiteRook",
};

export const numbers: number[] = [];
for (let i = 1; i < 65; i++) {
  numbers.push(i);
}
