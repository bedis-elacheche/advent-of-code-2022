import { part1, part2 } from './solution';

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

describe('Day 04: Camp Cleanup', () => {
  it('should calculate how many assignment pairs does one range fully contain the other', () => {
    expect(part1(input)).toEqual(2);
  });

  it('should calculate how many assignment pairs do the ranges overlap', () => {
    expect(part2(input)).toEqual(4);
  });
});
