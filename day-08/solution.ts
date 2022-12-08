const parseInput = (input: string): number[][] =>
  input.split('\n').map((row) => row.split('').map(Number));

const getAdjacentTrees = (
  direction: 'up' | 'left' | 'down' | 'right',
  grid: number[][],
  x: number,
  y: number
): number[] => {
  switch (direction) {
    case 'left':
      return grid[y].slice(0, x);
    case 'right':
      return grid[y].slice(x + 1);
    case 'up':
      return Array.from({ length: y }, (_, i) => grid[i][x]);
    case 'down':
      return Array.from(
        { length: grid.length - y - 1 },
        (_, i) => grid[y + i + 1][x]
      );
  }
};

const isTreeVisible = (grid: number[][], x: number, y: number): boolean => {
  if (x === 0 || x === grid[0].length - 1 || y === 0 || y === grid.length - 1) {
    return true;
  }

  const treeIsShorter = (item: number) => item < grid[y][x];

  return (
    getAdjacentTrees('up', grid, x, y).every(treeIsShorter) ||
    getAdjacentTrees('left', grid, x, y).every(treeIsShorter) ||
    getAdjacentTrees('down', grid, x, y).every(treeIsShorter) ||
    getAdjacentTrees('right', grid, x, y).every(treeIsShorter)
  );
};

export const part1 = (input: string): number => {
  const grid = parseInput(input);

  return grid.reduce(
    (total, row, y) =>
      row.reduce(
        (acc, _tree, x) => acc + Number(isTreeVisible(grid, x, y)),
        total
      ),
    0
  );
};

const getSideScenicScore = (
  direction: 'up' | 'left' | 'down' | 'right',
  grid: number[][],
  x: number,
  y: number
): number => {
  const treeBlockingTheView = (item: number) => item >= grid[y][x];
  const treesOnSide = getAdjacentTrees(direction, grid, x, y);

  if (direction === 'left' || direction === 'up') {
    treesOnSide.reverse();
  }

  const distanceToTallerTree = treesOnSide.findIndex(treeBlockingTheView);

  return (
    distanceToTallerTree > -1
      ? treesOnSide.slice(0, distanceToTallerTree + 1)
      : treesOnSide
  ).length;
};

const getScenicScore = (grid: number[][], x: number, y: number): number => {
  if (x === 0 || x === grid[0].length - 1 || y === 0 || y === grid.length - 1) {
    return 0;
  }

  return (
    getSideScenicScore('up', grid, x, y) *
    getSideScenicScore('left', grid, x, y) *
    getSideScenicScore('down', grid, x, y) *
    getSideScenicScore('right', grid, x, y)
  );
};

export const part2 = (input: string): number => {
  const grid = parseInput(input);

  return grid.reduce(
    (total, row, y) =>
      row.reduce(
        (acc, _tree, x) => Math.max(acc, getScenicScore(grid, x, y)),
        total
      ),
    0
  );
};
