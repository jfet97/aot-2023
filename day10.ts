type StreetSuffixTester<S, SF extends string> =
	S extends ''
		? false
		: S extends SF 
			? true
			: S extends `${infer _}${infer Rest}`
				? StreetSuffixTester<Rest, SF>
				: false;
