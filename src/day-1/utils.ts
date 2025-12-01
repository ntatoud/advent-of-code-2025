import type { Instruction } from "./input";

export function parseInstruction(instruction: Instruction) {
  const nbMovements = Number.parseInt(
    instruction.replaceAll("L", "").replaceAll("R", ""),
  );

  return instruction.startsWith("L") ? -nbMovements : nbMovements;
}

/**
 * Interval is [0, 99]
 */
export function getIntervalValue(value: number) {
  value = value % 100;

  if (value < 0) value += 100;
  return value;
}

/**
 * Interval is [0, 99]
 */
export function isInInterval(value: number) {
  return value < 100 && value >= 0;
}
