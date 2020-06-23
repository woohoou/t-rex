import Actor from './actor';

class Moon extends Actor {
  constructor(gameInstance) {
    super('MOON', gameInstance);

    this.posX = this.sceneSize['width'];
    this.posY = 30;
    this.currentMoon = Moon.seedMoon();

    this.updatePosition();
  }

  /**
   * Calculate which moon will spawn
   */
  static seedMoon() {
    return Math.floor(Math.random() * (6-0));
  }

  spriteX() {
    return this.actorProperties['x'] + (this.actorProperties['width'] * this.currentMoon);
  }

  width() {
    if(this.currentMoon === 3) {
      return this.actorProperties['width']*2;
    } else {
      return this.actorProperties['width'];
    }
  }

  /**
   * Update the position of the actor in canvas
   */
  updatePosition() {
    if(this.gameInstance.isGameOver || !this.active ) return;
    this.posX -= 0.2;
    if(this.x()+this.width() < 0) {
      this.gameInstance.lastTimeoutId = setTimeout(() => {
        this.posX = this.sceneSize['width'];
        this.currentMoon = Moon.seedMoon();
        requestAnimationFrame(this.updatePosition.bind(this));
      }, 42000);
    } else {
      requestAnimationFrame(this.updatePosition.bind(this));
    }
  }
}

export default Moon;