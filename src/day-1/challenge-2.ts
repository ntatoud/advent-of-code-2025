import { input, type Instruction } from "./input.ts";
import { getIntervalValue, isInInterval, parseInstruction } from "./utils.ts";

function getPassword(instructions: Array<Instruction>) {
  let zeroCount = 0;
  let value = 50;

  instructions.forEach((instruction) => {
    if (value < 0) throw new Error("Value should not be negative");

    const signedTicks = parseInstruction(instruction);
    const fullRotations = Math.floor(Math.abs(signedTicks) / 100);
    const ticksAfterFullRotations = signedTicks % 100;

    const hasAnExtraZeroTick =
      (!isInInterval(value + ticksAfterFullRotations) && value !== 0) ||
      value + ticksAfterFullRotations === 0;

    const passagesThroughZero = fullRotations + (hasAnExtraZeroTick ? 1 : 0);

    zeroCount += passagesThroughZero;

    value = value + signedTicks;
    value = getIntervalValue(value);
  });

  return zeroCount;
}

console.log("Result", getPassword(input));
