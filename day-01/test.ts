import { part1, part2 } from './solution';

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe('Day 01: Calorie Counting', () => {
  it('should calculate how many Calories are being carried by the Elf carrying the most Calories', () => {
    expect(part1(input)).toEqual(24000);
  });

  it('should calculate the total Calories carried by the top three Elves carrying the most Calories', () => {
    expect(part2(input)).toEqual(45000);
  });
});
