const getCaloriesPerElf = (input: string): Array<number> =>
  input
    .split('\n\n')
    .map((calories) =>
      calories.split('\n').reduce((sum, c) => sum + parseInt(c, 10), 0)
    );

export const part1 = (input: string): number =>
  getCaloriesPerElf(input).sort((a: number, b: number) => b - a)[0] || 0;

export const part2 = (input: string): number =>
  getCaloriesPerElf(input)
    .sort((a: number, b: number) => b - a)
    .slice(0, 3)
    .reduce((sum, c) => sum + c, 0);
