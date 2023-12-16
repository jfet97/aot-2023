type Reverse<S, R extends string = ''> = S extends `${infer C}${infer Rest}`
	? Reverse<Rest, `${C}${R}`>
  : R;
