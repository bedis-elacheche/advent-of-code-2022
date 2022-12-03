const parse = (input: string): string[] => input.split('\n');

const getCommonItem = (
  ...args: [first: string, second: string, ...other: string[]]
): string => {
  const [head, ...rest] = args;
  return Array.from(head).find((item) =>
    rest.every((arr) => arr.includes(item))
  );
};

const getItemPriority = (item: string): number => {
  const code = item.charCodeAt(0);
  const lowercase = {
    a: 97,
    z: 122
  };
  const uppercase = {
    a: 65,
    z: 90
  };

  if (code <= uppercase.z) {
    return code - uppercase.a + 27;
  }

  if (code <= lowercase.z) {
    return code - lowercase.a + 1;
  }

  return 0;
};

export const part1 = (input: string): number =>
  parse(input).reduce((sum, rucksack) => {
    const commonItem = getCommonItem(
      rucksack.slice(0, rucksack.length / 2),
      rucksack.slice(rucksack.length / 2)
    );

    return sum + getItemPriority(commonItem);
  }, 0);

const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const part2 = (input: string): number =>
  chunk(parse(input), 3).reduce((sum, [firstElf, secondElf, thirdElf]) => {
    const commonItem = getCommonItem(firstElf, secondElf, thirdElf);

    return sum + getItemPriority(commonItem);
  }, 0);
