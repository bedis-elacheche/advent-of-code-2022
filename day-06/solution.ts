const isMarker = (marker: string, length: number): boolean =>
  new Set(marker.split('')).size === length;

const decoder = (input: string, markerLength: number): number => {
  for (let i = 0; i < input.length - markerLength; i++) {
    if (isMarker(input.slice(i, i + markerLength), markerLength)) {
      return i + markerLength;
    }
  }

  return -1;
};

export const part1 = (input: string): number => decoder(input, 4);

export const part2 = (input: string): number => decoder(input, 14);
