import { input, type Instruction } from "./input.ts";
import { getIntervalValue, parseInstruction } from "./utils.ts";

function getPassword(instructions: Array<Instruction>) {
  let zeroCount = 0;
  let value = 50;

  instructions.forEach((instruction) => {
    value = getIntervalValue(value + parseInstruction(instruction));

    if (value === 0) zeroCount++;
  });

  return zeroCount;
}

console.log("Result", getPassword(input));
