enum Outcome {
  LOSS = 0,
  DRAW = 3,
  WIN = 6
}

enum Shape {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3
}

type Game = `${'A' | 'B' | 'C'} ${'X' | 'Y' | 'Z'}`;

const calculateScore = (input: string, SCORE_MAP: Map<Game, number>) =>
  input
    .split('\n')
    .reduce((sum: number, game: Game) => sum + (SCORE_MAP.get(game) ?? 0), 0);

export const part1 = (input: string): number =>
  calculateScore(
    input,
    new Map([
      ['A X', Shape.ROCK + Outcome.DRAW],
      ['B X', Shape.ROCK + Outcome.LOSS],
      ['C X', Shape.ROCK + Outcome.WIN],

      ['A Y', Shape.PAPER + Outcome.WIN],
      ['B Y', Shape.PAPER + Outcome.DRAW],
      ['C Y', Shape.PAPER + Outcome.LOSS],

      ['A Z', Shape.SCISSORS + Outcome.LOSS],
      ['B Z', Shape.SCISSORS + Outcome.WIN],
      ['C Z', Shape.SCISSORS + Outcome.DRAW]
    ])
  );

export const part2 = (input: string): number =>
  calculateScore(
    input,
    new Map([
      ['A X', Outcome.LOSS + Shape.SCISSORS],
      ['B X', Outcome.LOSS + Shape.ROCK],
      ['C X', Outcome.LOSS + Shape.PAPER],

      ['A Y', Outcome.DRAW + Shape.ROCK],
      ['B Y', Outcome.DRAW + Shape.PAPER],
      ['C Y', Outcome.DRAW + Shape.SCISSORS],

      ['A Z', Outcome.WIN + Shape.PAPER],
      ['B Z', Outcome.WIN + Shape.SCISSORS],
      ['C Z', Outcome.WIN + Shape.ROCK]
    ])
  );
