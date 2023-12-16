type ToTuple<
	El,
  N extends number,
  Res extends readonly any[] = []
> = N extends Res["length"] ? Res : ToTuple<El, N, [...Res, El]>;

type BoxToys<El, Ns extends number> = Ns extends infer N extends number
	? ToTuple<El, N>
	: never;
