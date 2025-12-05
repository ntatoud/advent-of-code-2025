import type { RangeFromTo } from "./utils.ts";

/**
 * Relative to the currentRange
 *
 * from |------------------------| to
 *              from |-----------------------| to
 */
export function overlapsAtTheEnd(current: RangeFromTo, following: RangeFromTo) {
  return (
    current.from <= following.from &&
    current.to < following.to &&
    current.to >= following.from
  );
}

/**
 * Relative to the currentRange
 *
 *              from |------------------------| to
 * from |-----------------------| to
 */
export function overlapsAtTheStart(
  current: RangeFromTo,
  following: RangeFromTo,
) {
  return (
    current.from >= following.from &&
    current.to > following.to &&
    current.from <= following.to
  );
}

/**
 * Relative to the currentRange
 *
 *      from |-----------| to
 * from |--------------------| to
 */
export function isIncludedIn(current: RangeFromTo, following: RangeFromTo) {
  return current.from >= following.from && current.to <= following.to;
}

/**
 * Relative to the currentRange
 *
 * from |-------------------| to
 *      from |---------| to
 */
export function includes(current: RangeFromTo, following: RangeFromTo) {
  return following.from >= current.from && following.to <= current.to;
}
