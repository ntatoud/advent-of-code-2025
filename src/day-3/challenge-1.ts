import { dummy } from "./dummy-input.ts";
import { input } from "./input.ts";
import { getBankJoltages } from "./utils.ts";

function getMaxBatteryJoltage(bankJoltages: number[]) {
  const lastValue = bankJoltages.pop() ?? 0;
  const maxValue = Math.max(...bankJoltages);
  const maxValueIndex = bankJoltages.indexOf(maxValue);

  return {
    value: maxValue,
    followingValues: [...bankJoltages.slice(maxValueIndex + 1), lastValue],
  };
}

function getMaxBankJoltage(bankJoltages: number[]) {
  const { value, followingValues } = getMaxBatteryJoltage(bankJoltages);

  return 10 * value + Math.max(...followingValues);
}

function getMaxOutput(banks: string[]) {
  let sum = 0;

  banks.forEach((bank) => {
    sum += getMaxBankJoltage(getBankJoltages(bank));
  });

  return sum;
}

console.log(getMaxOutput(dummy));
console.log(getMaxOutput(input));
