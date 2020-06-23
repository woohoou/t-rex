import Actor from './actor';

/**
 * Restart icon
 */
class Restart extends Actor {
  constructor(gameInstance) {
    super('RESTART', gameInstance);
    this.posX = this.sceneSize['width']/2 - this.width()/2;
    this.posY = ((this.sceneSize['height']/3)*2) - this.height()/2;
  }
}

export default Restart;