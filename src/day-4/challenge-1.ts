import { dummy } from "./dummy-input.ts";
import { input } from "./input.ts";

function getAdjacentRolls(grid: string[], pos: { x: number; y: number }) {
  const adjacentPositions = [
    { x: pos.x - 1, y: pos.y - 1 },
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x + 1, y: pos.y - 1 },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x - 1, y: pos.y + 1 },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x + 1, y: pos.y + 1 },
  ];

  const adjacentRolls = adjacentPositions
    .map((pos) => grid[pos.y]?.[pos.x])
    .filter((element) => element !== undefined && element === "@");

  console.log(adjacentPositions.map((pos) => grid[pos.y]?.[pos.x]));

  return adjacentRolls.length;
}

function getAccessibleRolls(grid: string[]) {
  let accessibleRolls = 0;
  const height = grid.length;
  const width = grid[0]?.length ?? 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tile = grid[y]?.[x];

      if (!tile) throw new Error("Invalid tile position");

      if (tile !== "@") continue;

      const adjacentRolls = getAdjacentRolls(grid, { x, y });

      if (adjacentRolls < 4) {
        accessibleRolls++;
      }
    }
  }

  return accessibleRolls;
}

console.log(getAccessibleRolls(dummy));
console.log(getAccessibleRolls(input));
