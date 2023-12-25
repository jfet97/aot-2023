export {};

type Alley = "  ";
type Santa = "🎅";
type Tree = "🎄";
type MazeItem = Tree | Santa | Alley;
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";

// dark utils

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never

type Push<T extends any[], V> = [...T, V];

type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
  true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>

// general utils

type ParseNumber<S> = S extends `${infer N extends number}`
	? N
	: never;

type ToNumbersTuple<
  N extends number,
  Res extends readonly number[] = []
> = N extends Res["length"]
	? Res
	: ToNumbersTuple<N, [...Res, Res["length"]]>;

type PlusOne<N extends number> =
	ToNumbersTuple<N> extends infer Res extends number[]
		? [...Res, Res["length"]]["length"]
		: never;

type MinusOne<N extends number> =
	ToNumbersTuple<N> extends [...infer _, infer Last]
		? Last
		: -1;

type IsGreater<N extends number, M extends number> =
	[ToNumbersTuple<N>, ToNumbersTuple<M>]  extends [infer $N extends number[], infer $M extends number[]]
	? $N extends [...$M, ...infer _ extends [any, ...any[]]]
    ? true
    : false
  : never;

type Max<N extends number, M extends number> =
  IsGreater<N, M> extends true
    ? N
    : M;

type Min<N extends number, M extends number> =
  IsGreater<N, M> extends true
    ? M
    : N;

// N - M where N must be >= N
type Difference<N extends number, M extends number> =
	[ToNumbersTuple<N>, ToNumbersTuple<M>]  extends [infer $N extends number[], infer $M extends number[]]
	? $N extends [...$M, ...infer  Diff]
    ? Diff["length"]
    : never
  : never;

type Sum<N extends number, M extends number> =
  ToNumbersTuple<N> extends infer $N extends number[]
  ? ToNumbersTuple<M> extends infer $M extends number[]
    ? [...$N, ...$M]["length"]
    : never
  : never;

type Coordinates = [number, number];

type ManhattanDistance<C1 extends Coordinates, C2 extends Coordinates> =
  [IsGreater<C1[0], C2[0]>, IsGreater<C1[1], C2[1]>] extends [infer $C1_0_Greater extends boolean, infer $C1_1_Greater extends boolean]
    ? {
      'truetrue': Sum<Difference<C1[0], C2[0]>, Difference<C1[1], C2[1]>>
      'truefalse': Sum<Difference<C1[0], C2[0]>, Difference<C2[1], C1[1]>>
      'falsetrue': Sum<Difference<C2[0], C1[0]>, Difference<C1[1], C2[1]>>
      'falsefalse': Sum<Difference<C2[0], C1[0]>, Difference<C2[1], C1[1]>>
    }[`${$C1_0_Greater}${$C1_1_Greater}`]
  : never;

// maze utils

type IsAlley<Item extends MazeItem> = Item extends Alley
    ? true
    : false;

type FindSantaRow<Row extends MazeMatrix[number], RowI> = {
	[ElI in keyof Row]: Row[ElI] extends Santa ? [ParseNumber<RowI>, ParseNumber<ElI>] : never
}[number];

type FindSanta<Forest extends MazeMatrix> = {
	[RowI in keyof Forest]: FindSantaRow<Forest[RowI], RowI>
}[number];

type CoordinatesUp<C extends Coordinates> = [MinusOne<C[0]>, C[1]];
type CoordinatesDown<C extends Coordinates> = [PlusOne<C[0]>, C[1]];
type CoordinatesLeft<C extends Coordinates> = [C[0], MinusOne<C[1]>];
type CoordinatesRight<C extends Coordinates> = [C[0], PlusOne<C[1]>];

type GetAlleyNeighbors<Forest extends MazeMatrix, C extends Coordinates> = {
	[I in keyof Forest]: Forest[I] extends infer $Forest_I extends MazeMatrix[number]
		? {
			[J in keyof $Forest_I]: [ParseNumber<I>, ParseNumber<J>] extends [infer $IN extends number, infer $JN extends number]
        ? ManhattanDistance<[C[0], C[1]], [$IN, $JN]> extends 1
          ? IsAlley<$Forest_I[J]> extends true
            ? [$IN, $JN]
            : never
          : never
        : never
		}[number]
		: never
}[number];

type NodeData<
  C extends Coordinates,
  PathCost extends number,
  ManhattanDistance extends number,
  Cost extends number,
  Parent extends NodeDataSuperType | null = null,
> = {
  cell: C,
  fromStartCost: PathCost,
  toEndCost: ManhattanDistance,
  cost: Cost,
  parent: Parent,
};

type NodeDataSuperType = NodeData<Coordinates, number, number, number, any>;

type SetNodeData<
  C extends Coordinates,
  PathCost extends number,
  End extends Coordinates,
  Parent extends NodeDataSuperType | null = null,
> = C extends any
  ? ManhattanDistance<C, End> extends infer $ManhattanDistance extends number
    ? NodeData<C, PathCost, $ManhattanDistance, Sum<PathCost, $ManhattanDistance>, Parent>
    : never
  : never;

type GetMinCostCell<
  Cells extends NodeDataSuperType[],
  MinCell extends NodeDataSuperType,
  Rest extends NodeDataSuperType[] = [],
> =
  Cells extends [infer $Cell extends NodeDataSuperType, ...infer $Cells extends NodeDataSuperType[]]
    ? Min<$Cell["cost"], MinCell["cost"]> extends $Cell["cost"]
      ? GetMinCostCell<$Cells, $Cell, [...Rest, MinCell]>
      : GetMinCostCell<$Cells, MinCell, Rest>
    : { min: MinCell, rest: Rest };

// type RemoveCostCell<
//   Cells extends NodeDataSuperType[],
//   C extends Coordinates,
//   Res extends NodeDataSuperType[] = [],
// > =
//   Cells extends [infer $Cell extends NodeDataSuperType, ...infer $Cells extends NodeDataSuperType[]]
//     ? $Cell["cell"] extends C
//       ? [...Res, ...$Cells]
//       : RemoveCostCell<$Cells, C, [...Res, $Cell]>
//     : never

type FindExit<Forest extends MazeMatrix> = {
	[I in keyof Forest]: Forest[I] extends infer $Forest_I extends MazeMatrix[number]
    ? {
      [J in keyof $Forest_I]: IsAlley<$Forest_I[J]> extends true
        ? I extends "0" | `${MinusOne<Forest["length"]> & number}`
          ? [ParseNumber<I>, ParseNumber<J>]
          : J extends "0" | `${MinusOne<$Forest_I["length"]> & number}`
            ? [ParseNumber<I>, ParseNumber<J>]
            : never
        : never
    }[number]
    : never
}[number];

namespace SolveMaze {
  type GetStartExitPath<EndNode extends NodeDataSuperType, Res extends Coordinates[] = []> =
    EndNode["parent"] extends infer $Parent extends NodeDataSuperType
      ? GetStartExitPath<$Parent, [EndNode["cell"], ...Res]>
      : [EndNode["cell"], ...Res];

  type _SolveMaze<
    Forest extends MazeMatrix,
    CurrentPosition extends NodeDataSuperType,
    Exit extends Coordinates,
    Frontier extends NodeDataSuperType[] = [],
  > =
    CurrentPosition["cell"] extends Exit
      ? GetStartExitPath<CurrentPosition> extends infer $Path extends Coordinates[]
        ? $Path
        : never
      : GetAlleyNeighbors<Forest, CurrentPosition["cell"]> extends infer $Neighbors extends Coordinates
        ? SetNodeData<$Neighbors, Sum<CurrentPosition["fromStartCost"], 1>, Exit, CurrentPosition> extends infer $NeighborNodeData extends NodeDataSuperType
          ? TuplifyUnion<$NeighborNodeData> extends infer $NeighborNodeDataTuple extends NodeDataSuperType[]
            ? [...$NeighborNodeDataTuple, ...Frontier] extends infer $Frontier extends NodeDataSuperType[]
              ? $Frontier extends [infer $FrontierHead extends NodeDataSuperType, ...infer $FrontierTail extends NodeDataSuperType[]]
                ? GetMinCostCell<$FrontierTail, $FrontierHead> extends {
                    min: infer $MinCostCell extends NodeDataSuperType,
                    rest: infer $NextFrontier extends NodeDataSuperType[]
                  }
                    ? _SolveMaze<Forest, $MinCostCell, Exit, $NextFrontier>
                    : never
                : "unsolvable"
              : never
            : never
          : never
        :never;

  export type SolveMaze<Forest extends MazeMatrix> =
    [FindExit<Forest>, FindSanta<Forest>] extends [infer $Exit extends Coordinates, infer $Santa extends Coordinates]
    ? [$Exit] extends [never]
        ? "unsolvable"
        : SetNodeData<$Santa, 0, $Exit> extends infer $SantaNodeData extends NodeDataSuperType
          ? _SolveMaze<Forest, $SantaNodeData, $Exit>
          : never
    : never;

  export type _ToMoves<
    Prev extends Coordinates,
    Rest extends Coordinates[],
    Res extends Directions[] = []
  > =
    Rest extends [infer $Curr extends Coordinates, ...infer $Rest extends Coordinates[]]
      ? CoordinatesUp<Prev> extends $Curr
        ? _ToMoves<$Curr, $Rest, [...Res, "up"]>
        : CoordinatesDown<Prev> extends $Curr
          ? _ToMoves<$Curr, $Rest, [...Res, "down"]>
          : CoordinatesLeft<Prev> extends $Curr
            ? _ToMoves<$Curr, $Rest, [...Res, "left"]>
            : CoordinatesRight<Prev> extends $Curr
              ? _ToMoves<$Curr, $Rest, [...Res, "right"]>
              : never
      : Res;

  export type ToMoves<CS extends Coordinates[]> =
    CS extends [infer $C extends Coordinates, ...infer $CS extends Coordinates[]]
      ? _ToMoves<$C, $CS>
      : [];
}

// -------------- tests --------------

type Maze0 = [
  ["🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄"],
  ["🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎅", "🎄", "🎄", "🎄"],
  ["🎄", "🎄", "🎄", "🎄", "  ", "🎄", "  ", "  ", "  ", "🎄"],
  ["🎄", "🎄", "🎄", "🎄", "  ", "🎄", "  ", "🎄", "  ", "🎄"],
  ["🎄", "  ", "  ", "  ", "  ", "🎄", "  ", "🎄", "  ", "🎄"],
  ["  ", "  ", "🎄", "🎄", "  ", "  ", "  ", "🎄", "🎄", "🎄"],
  ["🎄", "  ", "🎄", "🎄", "  ", "🎄", "  ", "🎄", "🎄", "🎄"],
  ["🎄", "  ", "🎄", "🎄", "  ", "🎄", "  ", "🎄", "🎄", "🎄"],
  ["🎄", "  ", "  ", "  ", "  ", "🎄", "  ", "🎄", "🎄", "🎄"],
  ["🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄"],
];

type Path_0 = SolveMaze.SolveMaze<Maze0>;
type Moves_0 = SolveMaze.ToMoves<Path_0>;
//   ^?


type Maze1_NoExit = [
  ["🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄"],
  ["🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎅", "🎄", "🎄", "🎄"],
  ["🎄", "🎄", "🎄", "🎄", "  ", "🎄", "  ", "  ", "  ", "🎄"],
  ["🎄", "🎄", "🎄", "🎄", "  ", "🎄", "  ", "🎄", "  ", "🎄"],
  ["🎄", "  ", "  ", "  ", "  ", "🎄", "  ", "🎄", "  ", "🎄"],
  ["🎄", "  ", "🎄", "🎄", "  ", "  ", "  ", "🎄", "🎄", "🎄"],
  ["🎄", "  ", "🎄", "🎄", "  ", "🎄", "  ", "🎄", "🎄", "🎄"],
  ["🎄", "  ", "🎄", "🎄", "  ", "🎄", "  ", "🎄", "🎄", "🎄"],
  ["🎄", "  ", "  ", "  ", "  ", "🎄", "  ", "🎄", "🎄", "🎄"],
  ["🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄"],
];

type Path_1 = SolveMaze.SolveMaze<Maze1_NoExit>;
//   ^?


type Maze2 = [
  ["🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄"],
  ["🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎅", "🎄", "🎄", "🎄"],
  ["🎄", "🎄", "🎄", "🎄", "  ", "🎄", "  ", "  ", "  ", "🎄"],
  ["🎄", "🎄", "🎄", "🎄", "  ", "🎄", "  ", "🎄", "  ", "🎄"],
  ["🎄", "  ", "  ", "🎄", "  ", "🎄", "  ", "🎄", "  ", "🎄"],
  ["  ", "  ", "🎄", "🎄", "  ", "  ", "  ", "🎄", "🎄", "🎄"],
  ["🎄", "  ", "🎄", "🎄", "  ", "🎄", "  ", "🎄", "🎄", "🎄"],
  ["🎄", "  ", "  ", "  ", "  ", "🎄", "  ", "🎄", "🎄", "🎄"],
  ["🎄", "  ", "  ", "  ", "  ", "🎄", "  ", "🎄", "🎄", "🎄"],
  ["🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄", "🎄"],
];

type Path_2 = SolveMaze.SolveMaze<Maze2>;
type Moves_2 = SolveMaze.ToMoves<Path_2>;
//   ^?