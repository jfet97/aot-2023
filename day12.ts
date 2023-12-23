type FindSanta<A, R extends readonly any[] = []> = A extends readonly [infer F, ...infer Rest]
	? F extends '🎅🏼'
		? R["length"]
		: FindSanta<Rest, [...R, any]>
	: never;

type ParseNumber<S> = S extends `${infer N extends number}` ? N : never

type FindSantaIt<A extends readonly any[]> = {
	[I in keyof A]: A[I] extends '🎅🏼' ? ParseNumber<I> : never
}[number];
