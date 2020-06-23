export const startGame = () => ({
  type: 'START_GAME'
});

export const stopGame = () => ({
  type: 'STOP_GAME'
});

export const setLevel = (level) => ({
  type: 'SET_LEVEL',
  level: level
})