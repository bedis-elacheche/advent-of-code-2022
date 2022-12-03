import { part1, part2 } from './solution';

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

describe('Day 03: Rucksack Reorganization', () => {
  it('should calculate the sum of the priority of the item type that appears in both compartments of each rucksack', () => {
    expect(part1(input)).toEqual(157);
  });

  it('should calculate the sum of the priorities of the item types', () => {
    expect(part2(input)).toEqual(70);
  });
});
