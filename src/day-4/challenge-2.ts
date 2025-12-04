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

  return adjacentRolls.length;
}
function getAccessibleRollsPositions(grid: string[]) {
  let accessbileRollsPositions = [];
  const height = grid.length;
  const width = grid[0]?.length ?? 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tile = grid[y]?.[x];

      if (!tile) throw new Error("Invalid tile position");

      if (tile !== "@") continue;

      const adjacentRolls = getAdjacentRolls(grid, { x, y });

      if (adjacentRolls < 4) {
        accessbileRollsPositions.push({ x, y });
      }
    }
  }

  return accessbileRollsPositions;
}

function removeCurrentlyAccessibleRolls(grid: string[]): {
  updatedGrid: string[];
  removedRollsCount: number;
} {
  const accessibleRollsPositions = getAccessibleRollsPositions(grid);

  accessibleRollsPositions.forEach((pos) => {
    const row = grid[pos.y];
    if (!row) throw new Error("Invalid row number");

    const splitRow = row.split("");

    // Make the roll a new empty space
    splitRow[pos.x] = ".";
    grid[pos.y] = splitRow.join("");
  });

  return {
    updatedGrid: grid,
    removedRollsCount: accessibleRollsPositions.length,
  };
}

function removeAllAccessibleRolls(
  grid: string[],
  totalRemovedRollsCount: number = 0,
) {
  const { removedRollsCount, updatedGrid } =
    removeCurrentlyAccessibleRolls(grid);

  if (removedRollsCount === 0) return totalRemovedRollsCount;

  return removeAllAccessibleRolls(
    updatedGrid,
    totalRemovedRollsCount + removedRollsCount,
  );
}

console.log(removeAllAccessibleRolls(dummy));
console.log(removeAllAccessibleRolls(input));
