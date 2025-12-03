import { dummy } from "./dummy-input.ts";
import { input } from "./input.ts";
import { getBankJoltages } from "./utils.ts";

const DIGIT_LENGTH = 12;

function getMaxBatteryJoltage(bankJoltages: number[], maxDigits: number) {
  const heading = bankJoltages.slice(0, bankJoltages.length - maxDigits);
  const trailing = bankJoltages.slice(bankJoltages.length - maxDigits);

  const maxValue = Math.max(...heading);
  const maxValueIndex = bankJoltages.indexOf(maxValue);

  return {
    value: maxValue,
    followingValues: [...heading.slice(maxValueIndex + 1), ...trailing],
  };
}

function getMaxBankJoltage(bankJoltages: number[]) {
  let joltageDigits: number[] = [];

  for (let i = DIGIT_LENGTH - 1; i >= 0; i--) {
    const { value, followingValues } = getMaxBatteryJoltage(bankJoltages, i);

    joltageDigits.push(value);
    bankJoltages = followingValues;
  }

  return Number.parseInt(joltageDigits.join(""));
}

function getMaxOutput(banks: string[]) {
  let sum = 0;

  banks.forEach((bank) => {
    const maxBankJoltage = getMaxBankJoltage(getBankJoltages(bank));
    sum += maxBankJoltage;
  });

  return sum;
}

console.log(getMaxOutput(dummy));
console.log(getMaxOutput(input));
