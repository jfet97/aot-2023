type SantaListProtector<T> = T extends Function ? T : {
	readonly [K in keyof T]: SantaListProtector<T[K]>
};
