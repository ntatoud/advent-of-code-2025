import { dummy } from "./dummy.ts";
import { input } from "./input.ts";

export function solveProblems(data: string[]) {
  const parsedData = data.map((row, index) => {
    const rowWithoutTheSpaces = row.split(" ").filter((el) => el !== "");

    if (index === data.length - 1) {
      return rowWithoutTheSpaces.map((operator) => operator);
    }

    return rowWithoutTheSpaces.map((numberStr) => {
      return Number.parseInt(numberStr);
    });
  });

  let answers: number[] = [];

  const nbProblems = parsedData[0]?.length;

  if (!nbProblems) throw new Error("Parsing failed");

  for (let i = 0; i < nbProblems; i++) {
    let problem = [parsedData[data.length - 1]![i]!];
    for (let j = 0; j < data.length - 1; j++) {
      problem.push(parsedData[j]![i]! as number);
    }

    answers[i] = solveProblem(problem);
  }

  return answers.reduce((total, answer) => total + answer);
}

export function solveProblem(elements: (string | number)[]) {
  const numbers = elements.slice(1) as (string | number)[];
  const operator = elements[0];
  return numbers.reduce(
    (result, number) => eval(`${result} ${operator} ${number}`),
    operator === "+" ? 0 : 1,
  ) as number;
}

console.log(solveProblems(dummy));
console.log(solveProblems(input));
