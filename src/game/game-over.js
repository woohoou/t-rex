import Actor from './actor';

/**
 * Game over text
 */
class GameOver extends Actor {
  constructor(gameInstance) {
    super('GAME_OVER', gameInstance);
    this.posX = this.sceneSize['width']/2 - this.width()/2;
    this.posY = this.sceneSize['height']/3 - this.height()/2;
  }
}

export default GameOver;