import { CellStatus, CellValueStatus } from "./enums";

export type Board = number[][];
export type BoardGame = Cell[][];
export type BoardSubgrids = number[][][];

export interface Cell {
  value: number;
  row: number;
  col: number;
  status: CellStatus;
  valueStatus: CellValueStatus;
  notes: number[];
}