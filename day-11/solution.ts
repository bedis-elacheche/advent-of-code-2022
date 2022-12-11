class Monkey {
  private _id: number;
  private _items: number[];
  private _operation: string;
  private _divisor: number;
  private _truthy: number;
  private _falsy: number;
  private _inspectedItems: number;

  constructor([
    index,
    startingItems,
    operation,
    divisor,
    truthy,
    falsy
  ]: string[]) {
    this._id = parseInt(index.slice(7), 10);
    this._items = startingItems.slice(16).split(', ').map(Number);
    this._operation = operation.slice(17);
    this._divisor = parseInt(divisor.slice(19), 10);
    this._truthy = parseInt(truthy.slice(27), 10);
    this._falsy = parseInt(falsy.slice(28), 10);
    this._inspectedItems = 0;
  }

  takeTurn(monkeys: Monkey[], manageWorry: (n: number) => number): void {
    this._inspectedItems += this._items.length;
    while (this._items.length) {
      const item = this._items.shift();
      const worryLevel = manageWorry(
        eval(this._operation.replace(/old/g, item.toString()))
      );
      const condition = worryLevel % this._divisor === 0;

      monkeys[condition ? this._truthy : this._falsy].push(worryLevel);
    }
  }

  push(item: number): void {
    this._items.push(item);
  }

  getDivisor(): number {
    return this._divisor;
  }

  getTotalInspectedItems(): number {
    return this._inspectedItems;
  }
}

const getMonkeyBusinessLevel = (monkeys: Monkey[]): number => {
  const inspectedItems = monkeys
    .map((monkey) => monkey.getTotalInspectedItems())
    .sort((a, b) => b - a);

  return inspectedItems[0] * inspectedItems[1];
};

const parseInput = (input: string): Monkey[] =>
  input.split('\n\n').map((row) => new Monkey(row.split('\n')));

export const part1 = (input: string): number => {
  const monkeys = parseInput(input);

  for (let i = 0; i < 20; i++) {
    monkeys.forEach((monkey) =>
      monkey.takeTurn(monkeys, (worryLevel) => Math.floor(worryLevel / 3))
    );
  }

  return getMonkeyBusinessLevel(monkeys);
};

export const part2 = (input: string): number => {
  const monkeys = parseInput(input);
  const productOfAllDivisors = monkeys.reduce(
    (product, monkey) => product * monkey.getDivisor(),
    1
  );

  for (let i = 0; i < 10000; i++) {
    monkeys.forEach((monkey) =>
      monkey.takeTurn(
        monkeys,
        (worryLevel) => worryLevel % productOfAllDivisors
      )
    );
  }

  return getMonkeyBusinessLevel(monkeys);
};
