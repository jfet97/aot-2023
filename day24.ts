type Alley = "  ";
type Santa = "🎅";
type Tree = "🎄";
type MazeItem = Tree | Santa | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";

type WinForest = [
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
];

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

type IsMinusOne<N extends number> = N extends -1 ? true : false

type IsGreater<N extends number, M extends number> =
	[ToNumbersTuple<N>, ToNumbersTuple<M>]  extends [infer $N extends number[], infer $M extends number[]]
	? $N extends []
		? false
		: $M extends []
			? true
			: [MinusOne<N>, MinusOne<M>] extends [infer $PN extends number, infer $PM extends number]
				? IsGreater<$PN, $PM>
				: false
	: false

// maze utils

type IsTree<Item extends MazeItem> = Item extends Tree
	? true
	: false;

type Coordinates = [number, number];

type FindSantaRow<Row extends MazeMatrix[number], RowI> = {
	[ElI in keyof Row]: Row[ElI] extends Santa ? [RowI, ElI] : never
}[number];

type FindSantaTable<Forest extends MazeMatrix> = {
	[RowI in keyof Forest]: FindSantaRow<Forest[RowI], RowI>
}[number];

type FindSanta<Forest extends MazeMatrix> =
	FindSantaTable<Forest> extends infer Res
		? { [I in keyof Res]: ParseNumber<Res[I]> }
		: never;

type CoordinatesUp<C extends Coordinates> = [MinusOne<C[0]>, C[1]];
type CoordinatesDown<C extends Coordinates> = [PlusOne<C[0]>, C[1]];
type CoordinatesLeft<C extends Coordinates> = [C[0], MinusOne<C[1]>];
type CoordinatesRight<C extends Coordinates> = [C[0], PlusOne<C[1]>];

type NextCoordinates<C extends Coordinates, Step extends Directions> = {
	"up": CoordinatesUp<C>
	"down": CoordinatesDown<C>
	"left": CoordinatesLeft<C>
	"right": CoordinatesRight<C>
}[Step];

type ReadCell<Forest extends MazeMatrix, C extends Coordinates> = {
	[I in keyof Forest]: Forest[I] extends infer $Forest_I extends MazeMatrix[number]
		? {
			[J in keyof $Forest_I]: [ParseNumber<I>, ParseNumber<J>] extends C ? $Forest_I[J] : never
		}[number]
		: never
}[number];

type WriteCell<Forest extends MazeMatrix, C extends Coordinates, Item extends MazeItem> = {
	[I in keyof Forest]: Forest[I] extends infer $Forest_I extends MazeMatrix[number]
		? {
			[J in keyof $Forest_I]: [ParseNumber<I>, ParseNumber<J>] extends C ? Item : $Forest_I[J]
		}
		: Forest[I]
};

type IsOut<Forest extends MazeMatrix, C extends Coordinates> =
	C extends [-1, number] | [number, -1]
		? true
		: [
				MinusOne<Forest["length"]>,
				MinusOne<Forest[number]["length"]>
			] extends [infer $MaxCol extends number, infer $MaxRow extends number]
				? IsGreater<C[0], $MaxCol> extends infer _ extends false
					? IsGreater<C[1], $MaxRow> extends infer _ extends false
						? false
						: true
					: true
				: boolean;

type Move<Forest extends MazeMatrix, Step extends Directions> =
	FindSanta<Forest> extends infer $SantaPosition extends Coordinates
	? NextCoordinates<$SantaPosition, Step> extends infer $NextSantaPosition extends Coordinates
		? IsOut<Forest, $NextSantaPosition> extends true
			? WinForest
			: IsTree<ReadCell<Forest, $NextSantaPosition>> extends true
				? Forest
				: WriteCell<WriteCell<Forest, $NextSantaPosition, Santa>, $SantaPosition, Alley>
		: Forest
	: Forest;
