export const startGame = () => ({
  type: 'START_GAME'
});

export const stopGame = () => ({
  type: 'STOP_GAME'
});

export const increaseLevel = (level) => ({
  type: 'INCREASE_LEVEL',
  level: level
})