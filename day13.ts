type ToTuple<
  N extends number,
  Res extends readonly any[] = []
> = N extends Res["length"] ? Res : ToTuple<N, [...Res, Res["length"]]>;

type DayCounter<Start extends number, End extends number> =
  Exclude<
    ToTuple<End> extends infer R extends readonly any[]
      ? [...R, R["length"]][number]
      : never,
    ToTuple<Start> extends infer R extends readonly any[]
      ? R[number]
      : never
  >;

namespace Alternative {
  type ToTupleNever<
    N extends number,
    Res extends readonly never[] = []
  > = N extends Res["length"] ? Res : ToTupleNever<N, [...Res, never]>;

  type ToTuple<
    Start extends number,
    End extends number,
    Res extends readonly any[]
  > = End extends Res["length"]
    ? [...Res, Res["length"]]
    : ToTuple<Start, End, [...Res, Res["length"]]>;

  type DayCounter<Start extends number, End extends number> =
    ToTupleNever<Start> extends infer $N extends never[] // $N = ToTupleNever<Start>
      ? ToTuple<Start, End, $N> extends infer Res extends readonly any[]
        ? Res[number]
        : never
      : never;
};

namespace Alternative2 {
  type ToTuple<
    N extends number,
    Res extends readonly any[] = []
  > = N extends Res["length"]
    ? Res
    : ToTuple<N, [...Res, Res["length"]]>;

  type DayCounter<Start extends number, End extends number> =
    ToTuple<Start> extends infer $S extends number[]
      ? ToTuple<End> extends infer $E extends number[]
        ? [...$E, $E["length"]] extends [...$S, ...infer Rest extends number[]]
          ? Rest[number]
          : never
        : never
      : never;
};
