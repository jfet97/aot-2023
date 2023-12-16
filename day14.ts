type DecipherNaughtyList<S> = S extends `${infer F}/${infer Rest}`
	? F | DecipherNaughtyList<Rest>
	: S;
