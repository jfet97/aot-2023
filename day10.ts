// by @alexandercerutti
type StreetSuffixTester<Street, Suffix extends string> =
	Street extends `${any}${Suffix}` ? true : false;