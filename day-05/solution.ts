type Stack = string[];

const parseCrates = (input: string): Stack[] => {
  const [indexes, ...crates] = input.split('\n').reverse();
  const stackIndexes = indexes.match(/\d+/g);
  const stacks = Array.from(
    { length: parseInt(stackIndexes[stackIndexes.length - 1], 10) },
    () => [] as Stack
  );

  return crates.reduce((acc, line) => {
    line = line.replace(/ \[/g, '[').replace(/\s{4}/g, '   ');

    for (let i = 0; i < acc.length; i++) {
      const crate = line[i * 3 + 1];

      if (crate && crate !== ' ') {
        acc[i].push(crate);
      }
    }

    return acc;
  }, stacks);
};

type Action = { from: number; to: number; times: number };

const parseActions = (input: string): Action[] =>
  input.split('\n').map((action) => {
    const [_match, times, from, to] = action.match(
      /move (\d+) from (\d+) to (\d+)/
    );

    return {
      from: parseInt(from, 10) - 1,
      to: parseInt(to, 10) - 1,
      times: parseInt(times, 10)
    };
  });

const parseInput = (input: string): { stacks: Stack[]; actions: Action[] } => {
  const [crates, actions] = input.split('\n\n');

  return {
    stacks: parseCrates(crates),
    actions: parseActions(actions)
  };
};

const crateMover = (
  input: string,
  mover: (stacks: Stack[], action: Action) => void
): string => {
  const { stacks, actions } = parseInput(input);

  actions.forEach((action) => mover(stacks, action));

  return stacks.map((stack) => stack[stack.length - 1]).join('');
};

export const part1 = (input: string): string =>
  crateMover(input, (stacks, { times, from, to }) => {
    const iterations = Math.min(times, stacks[from].length || 0);

    for (let i = 0; i < iterations; i++) {
      const value = stacks[from].pop();

      stacks[to].push(value);
    }
  });

export const part2 = (input: string): string =>
  crateMover(input, (stacks, { times, from, to }) => {
    const values = stacks[from].splice(stacks[from].length - times, times);

    stacks[to].push(...values);
  });
