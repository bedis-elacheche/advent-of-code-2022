import { part1, part2 } from './solution';

const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

describe('Day 06: Tuning Trouble', () => {
  it('should calculate characters need to be processed before the first start-of-packet marker is detected', () => {
    expect(part1(input)).toEqual(7);
  });

  it('should calculate characters need to be processed before the first start-of-message marker is detected', () => {
    expect(part2(input)).toEqual(19);
  });
});
