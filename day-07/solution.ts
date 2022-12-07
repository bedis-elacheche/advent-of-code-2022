type FSFile = {
  id: string;
  parent: string;
  type: 'file';
  size: number;
};

type FSDirectory = {
  id: string;
  parent: string;
  type: 'dir';
  children: Map<string, FSNode>;
};

type FSNode = FSDirectory | FSFile;

const isDirectory = (node: FSNode): node is FSDirectory => node.type === 'dir';

const traverseFS = (fs: FSDirectory, path: string[]): FSDirectory => {
  let current: FSDirectory;

  path.forEach((dir) => {
    if (dir === '/') {
      current = fs;
    } else {
      const nextDiretory = current.children.get(dir);
      if (isDirectory(nextDiretory)) {
        current = nextDiretory;
      } else {
        throw 'Cannot traverse file nodes!';
      }
    }
  });

  return current;
};

const createNode = (fs: FSDirectory, path: string[], node: FSNode): void => {
  const directory = traverseFS(fs, path);

  directory.children.set(node.id, node);
};

const createFile = (
  fs: FSDirectory,
  path: string[],
  [size, id]: string[]
): void =>
  createNode(fs, path, {
    id,
    type: 'file',
    parent: path.at(-1),
    size: parseInt(size, 10)
  } as FSFile);

const createDirectory = (fs: FSDirectory, path: string[], id: string): void =>
  createNode(fs, path, {
    id,
    type: 'dir',
    parent: path.at(-1),
    children: new Map()
  } as FSDirectory);

const parseInputToFS = (input: string): FSDirectory => {
  const fs: FSDirectory = {
    id: '/',
    parent: '',
    type: 'dir',
    children: new Map<string, FSNode>()
  };
  const pwd: string[] = [];

  input
    .split('$ ')
    .filter(Boolean)
    .forEach((stdout) => {
      const [command, ...output] = stdout.split('\n').filter(Boolean);

      if (command.startsWith('cd ')) {
        const path = command.slice(3);

        if (path === '..') {
          pwd.pop();
        } else {
          pwd.push(path);
        }
      } else if (command === 'ls') {
        output.forEach((node) => {
          if (node.startsWith('dir ')) {
            createDirectory(fs, pwd, node.slice(4));
          } else {
            createFile(fs, pwd, node.split(' '));
          }
        });
      } else {
        throw 'Unsupported command';
      }
    });

  return fs;
};

const calculateNodeSize = (node: FSNode): number => {
  if (isDirectory(node)) {
    let size = 0;

    node.children.forEach((child: FSNode) => {
      size += calculateNodeSize(child);
    });
    return size;
  } else {
    return node.size;
  }
};

const getDirectoriesSizes = (
  directory: FSDirectory,
  path: string[],
  threshold: number,
  list: Record<string, number>
): Record<string, number> => {
  directory.children.forEach((node) => {
    if (isDirectory(node)) {
      const size = calculateNodeSize(node);

      if (size <= threshold) {
        list[[...path, node.id].join('/')] = size;
      }

      getDirectoriesSizes(node, [...path, node.id], threshold, list);
    }
  });

  return list;
};

export const part1 = (input: string): number => {
  const fs = parseInputToFS(input);
  const result = getDirectoriesSizes(fs, [''], 100000, {});

  return Object.values(result).reduce((sum, size) => sum + size, 0);
};

export const part2 = (input: string): number => {
  const fs = parseInputToFS(input);
  const result = getDirectoriesSizes(fs, [''], Infinity, {
    '/': calculateNodeSize(fs)
  });
  const totalDisk = 70000000;
  const minimumAvailableToUpdate = 30000000;
  const freeDisk = totalDisk - result['/'];
  const diskNeededToBeFreed = Math.max(minimumAvailableToUpdate - freeDisk, 0);

  return (
    Object.values(result)
      .filter((size) => size >= diskNeededToBeFreed)
      .sort((a, b) => a - b)[0] || 0
  );
};
