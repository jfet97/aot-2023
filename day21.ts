type TicTacToeChip = '❌' | '⭕';
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw';
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = '  '
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = 'top' | 'middle' | 'bottom';
type TicTacToeXPositions = 'left' | 'center' | 'right';
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [
  ['  ', '  ', '  '],
  ['  ', '  ', '  '],
  ['  ', '  ', '  ']
];

type NewGame = {
  board: EmptyBoard;
  state: '❌';
};


type NextTurnState = {
  '❌': '⭕'
  '⭕': '❌'
  '❌ Won': '❌ Won'
  '⭕ Won': '⭕ Won'
  'Draw': 'Draw'
};

type PositionCoordinates = {
  "top-left" : [0, 0]
  "middle-left" : [1, 0]
  "bottom-left" : [2, 0]
  "top-center" : [0, 1]
  "middle-center" : [1, 1]
  "bottom-center" : [2, 1]
  "top-right" : [0, 2]
  "middle-right" : [1, 2]
  "bottom-right" : [2, 2]
};

type WinningBoards<C extends TicTacToeChip> =
  [
    [C, C, C],
    ['  ' | TicTacToeChip, '  ' | TicTacToeChip, '  ' | TicTacToeChip],
    ['  ' | TicTacToeChip, '  ' | TicTacToeChip, '  ' | TicTacToeChip]
  ] |
  [
    ['  ' | TicTacToeChip, '  ' | TicTacToeChip, '  ' | TicTacToeChip],
    [C, C, C],
    ['  ' | TicTacToeChip, '  ' | TicTacToeChip, '  ' | TicTacToeChip]
  ] |
  [
    ['  ' | TicTacToeChip, '  ' | TicTacToeChip, '  ' | TicTacToeChip],
    ['  ' | TicTacToeChip, '  ' | TicTacToeChip, '  ' | TicTacToeChip],
    [C, C, C]
  ] |
  [
    [C, '  ' | TicTacToeChip, '  ' | TicTacToeChip],
    [C, '  ' | TicTacToeChip, '  ' | TicTacToeChip],
    [C, '  ' | TicTacToeChip, '  ' | TicTacToeChip]
  ] |
  [
    ['  ' | TicTacToeChip, C, '  ' | TicTacToeChip],
    ['  ' | TicTacToeChip, C, '  ' | TicTacToeChip],
    ['  ' | TicTacToeChip, C, '  ' | TicTacToeChip]
  ] |
  [
    ['  ' | TicTacToeChip, '  ' | TicTacToeChip, C],
    ['  ' | TicTacToeChip, '  ' | TicTacToeChip, C],
    ['  ' | TicTacToeChip, '  ' | TicTacToeChip, C]
  ] |
  [
    [C, '  ' | TicTacToeChip, '  ' | TicTacToeChip],
    ['  ' | TicTacToeChip, C, '  ' | TicTacToeChip],
    ['  ' | TicTacToeChip, '  ' | TicTacToeChip, C]
  ] |
  [
    ['  ' | TicTacToeChip, '  ' | TicTacToeChip, C],
    ['  ' | TicTacToeChip, C, '  ' | TicTacToeChip],
    [C, '  ' | TicTacToeChip, '  ' | TicTacToeChip]
  ];

type DrawBoard = [
  [TicTacToeChip, TicTacToeChip, TicTacToeChip],
  [TicTacToeChip, TicTacToeChip, TicTacToeChip],
  [TicTacToeChip, TicTacToeChip, TicTacToeChip]
];

type SetChipRow<
  Row extends TicTacToeCell[],
  C extends TicTacToeChip,
  Y extends 0 | 1 | 2,
  $Acc extends TicTacToeCell[] = []
> =
  $Acc["length"] extends Y
    ? SetChipRow<Row, C, Y, [...$Acc, C]>
    : $Acc["length"] extends Row["length"]
      ? $Acc
      : SetChipRow<Row, C, Y, [...$Acc, Row[$Acc["length"]]]>;

type SetChip<
  Board extends TicTactToeBoard,
  C extends TicTacToeChip,
  X extends 0 | 1 | 2,
  Y extends 0 | 1 | 2,
  $Acc extends readonly TicTacToeCell[][] = []
> =
  $Acc["length"] extends X
    ? SetChip<Board, C, X, Y, [...$Acc, SetChipRow<Board[X], C, Y>]>
    : $Acc["length"] extends Board["length"]
      ? $Acc
      : SetChip<Board, C, X, Y, [...$Acc, Board[$Acc["length"]]]>;

type NextGame<Game extends TicTacToeGame, NextBoard extends TicTactToeBoard> = {
  board: NextBoard
  state: NextBoard extends WinningBoards<'❌'>
          ? '❌ Won'
          : NextBoard extends WinningBoards<'⭕'>
            ? '⭕ Won' 
            : NextBoard extends DrawBoard
              ? 'Draw'
              : NextTurnState[Game["state"]]
};

type TicTacToe<Game extends TicTacToeGame, Move extends TicTacToePositions> =
  Game["state"] extends TicTacToeChip
    ? PositionCoordinates[Move] extends infer $XY extends [0 | 1 | 2, 0 | 1 | 2]
      ?  Game["board"][$XY[0]][$XY[1]] extends TicTacToeEmptyCell
        ? NextGame<Game, SetChip<Game["board"], Game["state"], $XY[0], $XY[1]>>
        : Game
      : Game
    : Game;
