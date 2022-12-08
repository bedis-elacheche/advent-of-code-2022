import { part1, part2 } from './solution';

const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

describe('Day 07: No Space Left On Device', () => {
  it('should calculate the sum of the total sizes of those directories', () => {
    expect(part1(input)).toEqual(95437);
  });

  it('should calculate is the total size of the smallest directory that, if deleted, would free up enough space on the filesystem to run the update', () => {
    expect(part2(input)).toEqual(24933642);
  });
});
