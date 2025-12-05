import { dummy, dummyRanges } from "./dummy-input.ts";
import { input, inputRanges, type Range } from "./input.ts";
import { getFreshRanges, type RangeFromTo } from "./utils.ts";

function isIdFresh(stringId: string, freshRanges: Array<RangeFromTo>) {
  const id = Number.parseInt(stringId);

  return freshRanges.some(
    (freshRange) => freshRange.from <= id && freshRange.to >= id,
  );
}

function countFreshIds(freshData: Range[], ids: string[]) {
  const freshRanges = getFreshRanges(freshData);

  const freshIds = ids.filter((id) => isIdFresh(id, freshRanges));

  return freshIds.length;
}

console.log(countFreshIds(dummyRanges, dummy));
console.log(countFreshIds(inputRanges, input));
