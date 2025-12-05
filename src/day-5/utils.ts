import type { Range } from "./input.ts";

export type RangeFromTo = ReturnType<typeof getFreshRange>;
function getFreshRange(data: Range) {
  const [from, to] = data.split("-").map((bound) => Number.parseInt(bound));

  if (!from || !to) throw new Error("Invalid range");
  return { from, to };
}

export function getFreshRanges(data: Range[]) {
  return data.map((rangeString) => getFreshRange(rangeString));
}
