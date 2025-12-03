import { dummy } from "./dummy-input.ts";
import { input, type RangeString } from "./input.ts";
import { getRange, isValidIdForChallenge1 } from "./utils.ts";

function getInvalidIds(data: Array<RangeString>) {
  const idRanges = data.map(getRange);

  let sum = 0;

  for (const idRange of idRanges) {
    const [start, end] = idRange;

    if (!start || !end) throw new Error("Invalid range of IDs");

    for (let id = start; id <= end; id++) {
      if (!isValidIdForChallenge1(id)) {
        sum += id;
      }
    }
  }

  return sum;
}

console.log(getInvalidIds(dummy));
console.log(getInvalidIds(input));
