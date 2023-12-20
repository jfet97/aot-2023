type Letters = {
  A: [
    '█▀█ ',
    '█▀█ ',
    '▀ ▀ ',
  ],
  B: [
    '█▀▄ ',
    '█▀▄ ',
    '▀▀  '
  ],
  C: [
    '█▀▀ ',
    '█ ░░',
    '▀▀▀ '
  ],
  E: [
    '█▀▀ ',
    '█▀▀ ',
    '▀▀▀ '
  ],
  H: [
    '█ █ ',
    '█▀█ ',
    '▀ ▀ '
  ],
  I: [
    '█ ',
    '█ ',
    '▀ '
  ],
  M: [
    '█▄░▄█ ',
    '█ ▀ █ ',
    '▀ ░░▀ '
  ],
  N: [
    '█▄░█ ',
    '█ ▀█ ',
    '▀ ░▀ '
  ],
  P: [
    '█▀█ ',
    '█▀▀ ',
    '▀ ░░'
  ],
  R: [
    '█▀█ ',
    '██▀ ',
    '▀ ▀ '
  ],
  S: [
    '█▀▀ ',
    '▀▀█ ',
    '▀▀▀ '
  ],
  T: [
    '▀█▀ ',
    '░█ ░',
    '░▀ ░'
  ],
  Y: [
    '█ █ ',
    '▀█▀ ',
    '░▀ ░'
  ],
  W: [
    '█ ░░█ ',
    '█▄▀▄█ ',
    '▀ ░ ▀ '
  ],
  ' ': [
    '░',
    '░',
    '░'
  ],
  ':': [
    '#',
    '░',
    '#'
  ],
  '*': [
    '░',
    '#',
    '░'
  ],
};

type AppendChar<
  S extends readonly [string, string, string],
  C extends readonly [string, string, string]
> = [`${S[0]}${C[0]}`, `${S[1]}${C[1]}`, `${S[2]}${C[2]}`];

type ToAsciiArt<
  S extends string,
  $Curr extends readonly [string, string, string] = ['', '', ''],
  $Acc extends readonly string[] = []
> =
  S extends `${infer F}${infer Rest}`
    ? Uppercase<F> extends infer $F extends keyof Letters
      ? ToAsciiArt<Rest, AppendChar<$Curr, Letters[$F]>, $Acc>
      : F extends `\n`
        ? ToAsciiArt<Rest, ['', '', ''], [...$Acc, ...$Curr]>
        : ToAsciiArt<Rest, $Curr, $Acc>
    : $Curr extends ['', '', '']
      ? $Acc
      : [...$Acc, ...$Curr];
