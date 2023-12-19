// ------------------- utils -------------------
type Replicate<
	T,
	N extends number,
	Acc extends readonly T[] = []
> =
	Acc["length"] extends N
		? Acc
		: Replicate<T, N, [T, ...Acc]>;

type Flatten<
	T extends readonly any[][],
	Acc extends readonly any[] = [],
	Ctr extends readonly any[][] = [],
> =
	Ctr["length"] extends T["length"]
		? Acc
		: Flatten<T, [...Acc, ...T[Ctr["length"]]], [T[Ctr["length"]], ...Ctr]>;

// ------------------- toys -------------------
type Toys = ['🛹', '🚲', '🛴', '🏄'];

type GetToy<
	I extends number | `${number}`,
	T extends readonly any[],
	$I = `${I}`
> =
	$I extends keyof T
		? T[$I]
		: GetToy<I, [...Toys, ...Toys]>;

type GetToys<
	I extends number | `${number}`,
	N extends number,
	Toy = GetToy<I, Toys>
> = Replicate<Toy, N>;

type $Rebuild<List extends readonly number[]> = {
	[I in keyof List]: GetToys<I, List[I]>
};

type Rebuild<
	List extends readonly number[],
	ListR = $Rebuild<List>
> =
	ListR extends infer _ extends any[][]
		? Flatten<ListR>
		: never;
