type FindSanta<A, R extends readonly any[] = []> = A extends readonly [infer F, ...infer Rest]
	? F extends '🎅🏼'
		? R["length"]
		: FindSanta<Rest, [...R, any]>
	: never;
