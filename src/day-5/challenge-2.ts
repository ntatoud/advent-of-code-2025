import { dummyRanges } from "./dummy-input.ts";
import { inputRanges, type Range } from "./input.ts";
import {
  includes,
  isIncludedIn,
  overlapsAtTheEnd,
  overlapsAtTheStart,
} from "./overlaps.ts";
import { getFreshRanges, type RangeFromTo } from "./utils.ts";

function removeOverlaps(freshRanges: Array<RangeFromTo>) {
  let tempRanges = [...freshRanges];
  let updatedFreshRanges: Array<RangeFromTo> = [];

  for (let i = 0; i < tempRanges.length; i++) {
    const currentRange = tempRanges[i];
    if (!currentRange) throw new Error("Invalid index");

    updatedFreshRanges.push(currentRange);

    // Update following ranges
    for (let j = i + 1; j < tempRanges.length; j++) {
      const followingRange = tempRanges[j];
      if (!followingRange) throw new Error("invalid index");

      if (overlapsAtTheEnd(currentRange, followingRange)) {
        followingRange.from = currentRange.to + 1;
        continue;
      }

      if (overlapsAtTheStart(currentRange, followingRange)) {
        followingRange.to = currentRange.from - 1;
        continue;
      }

      if (isIncludedIn(currentRange, followingRange)) {
        // We might introduce new duplicates that wont be processed here.
        // Hence, we need to run removeOverlaps twice
        updatedFreshRanges.push({
          from: followingRange.from,
          to: currentRange.from - 1,
        });
        updatedFreshRanges.push({
          from: currentRange.to + 1,
          to: followingRange.to,
        });
        tempRanges = tempRanges.filter((_, index) => index !== j);
        continue;
      }

      if (includes(currentRange, followingRange)) {
        tempRanges = tempRanges.filter((_, index) => index !== j);
        continue;
      }
    }
  }

  return updatedFreshRanges.filter((range) => range.from <= range.to);
}

function countIdsInFreshRange(freshRange: RangeFromTo) {
  return freshRange.to - freshRange.from + 1;
}

function countIdsInFreshRanges(freshRanges: Array<RangeFromTo>) {
  return freshRanges.reduce(
    (acc, range) => acc + countIdsInFreshRange(range),
    0,
  );
}

function countIdsInData(data: Array<Range>) {
  const freshRanges = removeOverlaps(removeOverlaps(getFreshRanges(data)));

  return countIdsInFreshRanges(freshRanges);
}

console.log(countIdsInData(dummyRanges));
console.log(countIdsInData(inputRanges));
