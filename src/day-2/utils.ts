import type { RangeString } from "./input.ts";

export function getRange(rangeString: RangeString) {
  return rangeString.split("-").map((range) => Number.parseInt(range));
}

export function isValidIdForChallenge1(id: number) {
  const stringId = String(id);
  if (stringId.length % 2 === 1) return true;

  const firstHalf = stringId.slice(0, stringId.length / 2);
  const secondHalf = stringId.slice(stringId.length / 2);

  return firstHalf !== secondHalf;
}

// CHALLENGE 2
function areAllArrayElementEqual(elements: string[]) {
  let result = true;
  elements.forEach((element) => {
    if (element !== elements[0]) result = false;
  });

  return result;
}

export function isValidIdForNRepetition(stringId: string, n: number) {
  if (stringId.length % n !== 0) return true;

  let parts: string[] = [];

  if (n === 1) {
    return !areAllArrayElementEqual(stringId.split(""));
  }

  for (let i = 0; i < n; i++) {
    parts.push(
      stringId.slice(
        (i * stringId.length) / n,
        ((i + 1) * stringId.length) / n,
      ),
    );
  }

  // console.log(parts);

  return !areAllArrayElementEqual(parts);
}

export function isValidIdForChallenge2(id: number) {
  const stringId = String(id);

  let result = true;
  for (let i = 1; i <= stringId.length - 1; i++) {
    if (!isValidIdForNRepetition(stringId, i)) {
      result = false;
    }
  }

  return result;
}

console.log(areAllArrayElementEqual(["1", "1", "5"]));
