type Connect4Chips = '🔴' | '🟡';
type Connect4Cell = Connect4Chips | '  ';
type Connect4State = '🔴' | '🟡' | '🔴 Won' | '🟡 Won' | 'Draw';

type Board = [
  [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
];

type Cols = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type Rows = 0 | 1 | 2 | 3 | 4 | 5;

type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
];

type SetChipRow<
  Row extends Board[0],
  C extends Cols,
  Chip extends Connect4Chips,
  $R extends readonly Connect4Cell[] = [],
> =
  $R["length"] extends C
    ? SetChipRow<Row, C, Chip, [...$R, Chip]>
    : $R["length"] extends 7
      ? $R
      : SetChipRow<Row, C, Chip, [...$R, Row[$R["length"]]]>;

type SetChipBoard<
  B extends Board,
  R extends Rows,
  NewRow extends Board[0],
  $R extends readonly Connect4Cell[][] = [],
> =
  $R["length"] extends R
    ? SetChipBoard<B, R, NewRow, [...$R, NewRow]>
    : $R["length"] extends 6
      ? $R
      : SetChipBoard<B, R, NewRow, [...$R, B[$R["length"]]]>;

type SetChip<
  B extends Board,
  C extends Cols,
  Chip extends Connect4Chips,
  $C extends any[] = [],
> =
  B[$C["length"]][C] extends "  "
    ? SetChip<B, C, Chip, [...$C, any]>
    : $C extends [any, ...infer $Rest]
      ? $Rest["length"] extends infer $R extends Rows
          ? SetChipBoard<B, $R, SetChipRow<B[$Rest["length"]], C, Chip>>
          : B
      : B;

type NextTurnState = {
  '🔴': '🟡'
  '🟡': '🔴'
  '🔴 Won': '🔴 Won'
  '🟡 Won': '🟡 Won'
  'Draw': 'Draw'
};

type DrawBoard = [
  [Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips],
  [Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips],
  [Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips],
  [Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips],
  [Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips],
  [Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips, Connect4Chips],
];

type WinningBoard<Chip extends Connect4Chips> =
  | [
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
  ]
  | [
    [Chip, Chip, Chip, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Chip, Chip, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Chip, Chip, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Chip, Chip, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Chip, Chip, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Chip, Chip, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Chip, Chip, Chip, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Chip, Chip, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Chip, Chip, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Chip, Chip, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Chip, Chip, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Chip, Chip, Chip, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Chip, Chip, Chip, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Chip, Chip, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Chip, Chip, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Chip, Chip, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Chip, Chip, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Chip, Chip, Chip, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Chip, Chip, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Chip, Chip, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Chip, Chip, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Chip, Chip, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Chip, Chip, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Chip, Chip, Chip],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
  ]
  | [
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
  ]
  | [
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
  ]
  | [
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
  ]
  | [
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell],
    [Connect4Cell, Connect4Cell, Connect4Cell, Chip, Connect4Cell, Connect4Cell, Connect4Cell],
  ];

type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

type Connect4<Game extends { board: Board, state: Connect4State }, C extends Cols> =
  Game["state"] extends infer $State extends Connect4State
    ? $State extends Connect4Chips
      ? SetChip<Game["board"], C, $State> extends infer $NewBoard extends Board
        ? {
            board: $NewBoard,
            state: $NewBoard extends WinningBoard<$State>
                    ? `${$State} Won`
                    : $NewBoard extends DrawBoard
                      ? 'Draw'
                      : NextTurnState[$State]
          }
        : Game
      : Game
    : Game;
