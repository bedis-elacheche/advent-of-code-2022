import { part1, part2 } from './solution';

const input = `30373
25512
65332
33549
35390`;

describe('Day 08: Treetop Tree House', () => {
  it('should calculate the total of  visible trees from outside the grid', () => {
    expect(part1(input)).toEqual(21);
  });

  it('should calculate the highest scenic score possible for any tree', () => {
    expect(part2(input)).toEqual(8);
  });
});
