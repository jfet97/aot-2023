type StringToNumber<S> = S extends `${infer N extends number}` ? N : never 

type FindSantaRow<Row extends readonly any[], RowI> = {
	[ElI in keyof Row]: Row[ElI] extends '🎅🏼' ? [RowI, ElI] : never
}[number];

type FindSantaTable<Forest extends readonly any[]> = {
	[RowI in keyof Forest]: FindSantaRow<Forest[RowI], RowI>
}[number];

type FindSanta<Forest extends readonly any[]> =
	FindSantaTable<Forest> extends infer Res
		? { [I in keyof Res]: StringToNumber<Res[I]> }
		: never;
