import { DIMENSIONS } from "./constants";

export function getArray(size) {
  return new Array(size).fill("");
}

export function getEdge(i, j, iLenght, jlength) {
  return i === 0 || j === 0 || i === iLenght - 1 || j === jlength - 1;
}

export function isStartNode(i, j) {
  return i === 0 && j === 0;
}
export function isEndNode(i, j, iLenght, jLength) {
  return i === iLenght - 1 && j === jLength - 1;
}

export function GetRandomCoordinates() {
    const randomRow = Math.floor(Math.random() * DIMENSIONS.ROWS);
    const randomCol = Math.floor(Math.random() * DIMENSIONS.COLS);
    return {
      i: randomRow,
      j: randomCol,
    };
  }