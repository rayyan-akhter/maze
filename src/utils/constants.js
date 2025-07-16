export const DIMENSIONS = {
  ROWS: 25,
  COLS: 19,
};

export const DIFFICULTY_LEVELS = {
  EASY: {
    name: "Easy",
    wallProbability: 0.3,
    timeBonus: 100,
  },
  MEDIUM: {
    name: "Medium", 
    wallProbability: 0.43,
    timeBonus: 150,
  },
  HARD: {
    name: "Hard",
    wallProbability: 0.6,
    timeBonus: 200,
  },
};

export const GAME_STATES = {
  MENU: "menu",
  PLAYING: "playing",
  PAUSED: "paused",
  WON: "won",
  LOST: "lost",
};

export const SCORING = {
  BASE_SCORE: 100,
  TIME_MULTIPLIER: 10,
  MOVES_PENALTY: 2,
};
