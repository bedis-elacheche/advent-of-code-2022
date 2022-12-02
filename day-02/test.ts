import { part1, part2 } from './solution';

const input = `A Y
B X
C Z`;

describe('Day 02: Rock Paper Scissors', () => {
  it('should calculate the score you would get if you were to follow the strategy guide', () => {
    expect(part1(input)).toEqual(15);
  });

  it('should calculate the score while figuring out the shape', () => {
    expect(part2(input)).toEqual(12);
  });
});
