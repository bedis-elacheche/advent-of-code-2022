type Range = { start: number; end: number };

const parse = (input: string): Range[][] =>
  input.split('\n').map((pair) =>
    pair.split(',').map((assignment) => {
      const [start, end] = assignment.split('-');

      return {
        start: parseInt(start, 10),
        end: parseInt(end, 10)
      };
    })
  );

export const part1 = (input: string): number =>
  parse(input).filter(([first, second]) => {
    const firstContainsSecond =
      first.start >= second.start && first.end <= second.end;
    const secondContainsFirst =
      second.start >= first.start && second.end <= first.end;

    return firstContainsSecond || secondContainsFirst;
  }).length;

export const part2 = (input: string): number =>
  parse(input).filter(([first, second]) => {
    const doesOverlap =
      Math.max(first.start, second.start) <= Math.min(first.end, second.end);

    return doesOverlap;
  }).length;
