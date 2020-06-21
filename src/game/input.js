export const CHARACTER_INPUT = {
  JUMP: [38, 32], // Up, spacebar
  DOWN: [40] // Down
};

export const GAME_INPUT = {
  RESTART: [13] // Enter
}

let gameInstance = null;

const keydownFn = (e) => {
  Object.keys(GAME_INPUT).forEach((action) => {
    if(GAME_INPUT[action].includes(e.keyCode))
      gameInstance.handleInput(action, 'keydown');
  });

  Object.keys(CHARACTER_INPUT).forEach((action) => {
    if(CHARACTER_INPUT[action].includes(e.keyCode))
      gameInstance.character.handleInput(action, 'keydown');
  });
};

const keyupFn = (e) => {
  Object.keys(GAME_INPUT).forEach((action) => {
    if(GAME_INPUT[action].includes(e.keyCode))
      gameInstance.handleInput(action, 'keyup');
  });

  Object.keys(CHARACTER_INPUT).forEach((action) => {
    if(CHARACTER_INPUT[action].includes(e.keyCode))
      gameInstance.character.handleInput(action, 'keyup');
  });
};

export const generateInputEvents = (_gameInstance) => {
  gameInstance = _gameInstance;
  document.removeEventListener('keydown', keydownFn);
  document.addEventListener('keydown', keydownFn);

  document.removeEventListener('keyup', keyupFn);
  document.addEventListener('keyup', keyupFn);
}