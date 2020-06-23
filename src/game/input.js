/**
 * Handle the input events from keyboard
 */
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


/**
 * Handle the touch events for mobile
 */
var touchStart = null;
const handleTouchStart = (e) => {
  e.preventDefault();

  touchStart = e.touches[0].clientY;
}

const handleTouchMove = (e) => {
  e.preventDefault();
}

const handleTouchEnd = (e) => {
  if(e.changedTouches[0].clientY > document.querySelector('header').clientHeight) {
    e.preventDefault();

    if(touchStart > e.changedTouches[0].clientY+5) {
      if(gameInstance.character.state === 'RUNNING') {
        gameInstance.character.jump();
      } else {
        gameInstance.character.run();
      }
    } else if(touchStart < e.changedTouches[0].clientY-5){
      gameInstance.character.down();
    } else {
      if(gameInstance.isGameOver) {
        gameInstance.restartGame()
      } else {
        gameInstance.character.state = 'RUNNING';
        gameInstance.character.jump();
      }
    }
    touchStart = null;
  }
}

export const generateInputEvents = (_gameInstance) => {
  gameInstance = _gameInstance;
  document.removeEventListener('keydown', keydownFn);
  document.addEventListener('keydown', keydownFn);

  document.removeEventListener('keyup', keyupFn);
  document.addEventListener('keyup', keyupFn);

  document.removeEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchstart', handleTouchStart);

  document.removeEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchmove', handleTouchMove);

  document.removeEventListener('touchend', handleTouchEnd);
  document.addEventListener('touchend', handleTouchEnd);
}