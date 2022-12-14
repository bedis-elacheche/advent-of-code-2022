import { part1, part2 } from './solution';

const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

describe('Day 05: Supply Stacks', () => {
  it('should return crates on top of each stack using CrateMover 9000', () => {
    expect(part1(input)).toEqual('CMZ');
  });

  it('should return crates on top of each stack using CrateMover 9001', () => {
    expect(part2(input)).toEqual('MCD');
  });
});
