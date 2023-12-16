type ToTuple<
  N extends number,
  Res extends readonly any[] = []
> = N extends Res["length"] ? Res : ToTuple<N, [...Res, any]>;

type ToNumber<S> = S extends `${infer N extends number}` ? N : never;

type DayCounter<Start extends number, End extends number> = ToNumber<
  Exclude<
    ToTuple<End> extends infer R extends readonly any[]
      ? keyof [any, ...R] & `${number}`
      : never,
    ToTuple<Start> extends infer R extends readonly any[]
      ? keyof R & `${number}`
      : never
  >
>;
