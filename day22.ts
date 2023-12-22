/** because "dashing" implies speed */
type Dasher = '💨';

/** representing dancing or grace */
type Dancer = '💃';

/** a deer, prancing */
type Prancer = '🦌';

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = '🌟';

/** for the celestial body that shares its name */
type Comet = '☄️';

/** symbolizing love, as Cupid is the god of love */
type Cupid = '❤️';

/** representing thunder, as "Donner" means thunder in German */
type Donner = '🌩️';

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = '⚡';

/** for his famous red nose */
type Rudolph = '🔴';

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

type Tuple3Items = [Reindeer, Reindeer, Reindeer];
type Tuple9Items = [Tuple3Items, Tuple3Items, Tuple3Items];
type Tuple9ItemsFlattened = [...Tuple3Items, ...Tuple3Items, ...Tuple3Items];
type SudokuGrid = [
	Tuple9Items,
	Tuple9Items,
	Tuple9Items,
	Tuple9Items,
	Tuple9Items,
	Tuple9Items,
	Tuple9Items,
	Tuple9Items,
	Tuple9Items
];
type SudokuGridFlattened = [
	Tuple9ItemsFlattened,
	Tuple9ItemsFlattened,
	Tuple9ItemsFlattened,
	Tuple9ItemsFlattened,
	Tuple9ItemsFlattened,
	Tuple9ItemsFlattened,
	Tuple9ItemsFlattened,
	Tuple9ItemsFlattened,
	Tuple9ItemsFlattened
];

// utils

type Is9TupleValid<
	T extends Tuple9ItemsFlattened
> = Reindeer extends T[number] ? true : false;

type Flatten3x3Slice<
	S extends [Tuple3Items, Tuple3Items, Tuple3Items]
> = [...S[0], ...S[1], ...S[2]];

type FlattenGrid<Grid extends SudokuGrid> = {
	[I in keyof Grid]: Flatten3x3Slice<Grid[I]>
};

type ValidateRows<Grid extends SudokuGrid> =
	FlattenGrid<Grid> extends infer $Grid extends SudokuGridFlattened
		? {
				[I in keyof $Grid]: Is9TupleValid<$Grid[I]>
			}[number] extends true ? true : false
		: false;

type ValidateColumns<Grid extends SudokuGrid> =
	FlattenGrid<Grid> extends infer $Grid extends SudokuGridFlattened
		? {
				[I in keyof $Grid]: I extends keyof $Grid[number]
					? Is9TupleValid<
							[
								$Grid[0][I], $Grid[1][I], $Grid[2][I],
								$Grid[3][I], $Grid[4][I], $Grid[5][I],
								$Grid[6][I], $Grid[7][I], $Grid[8][I]
							]
						>
					: false
			}[number] extends true ? true : false
		: false;

type SubgridsCoordinates = [
	[[0, 0], [1, 0], [2, 0]],
	[[0, 1], [1, 1], [2, 1]],
	[[0, 2], [1, 2], [2, 2]],
	[[3, 0], [4, 0], [5, 0]],
	[[3, 1], [4, 1], [5, 1]],
	[[3, 2], [4, 2], [5, 2]],
	[[6, 0], [7, 0], [8, 0]],
	[[6, 1], [7, 1], [8, 1]],
	[[6, 2], [7, 2], [8, 2]],
];

type ValidateSubgrids<Grid extends SudokuGrid> =
	{
		[I in keyof Grid]: I extends keyof SubgridsCoordinates
			? SubgridsCoordinates[I] extends infer $Subgrid extends SubgridsCoordinates[number]
				? Flatten3x3Slice<[
					Grid[$Subgrid[0][0]][$Subgrid[0][1]],
					Grid[$Subgrid[1][0]][$Subgrid[1][1]],
					Grid[$Subgrid[2][0]][$Subgrid[2][1]],
				]>
				: false
			: false
	} extends infer $Subgrids extends SudokuGridFlattened
		? {
				[I in keyof $Subgrids]: Is9TupleValid<$Subgrids[I]>
			}[number] extends true ? true : false
		: false;

type Validate<Grid extends SudokuGrid> =
	ValidateRows<Grid> | ValidateColumns<Grid> | ValidateSubgrids<Grid> extends true
    ? true
		: false;
