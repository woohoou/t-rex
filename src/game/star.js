import Actor from './actor';

class Star extends Actor {
  static yRange = [100, 10]

  constructor(gameInstance) {
    super('STAR', gameInstance);

    this.posX = this.sceneSize['width'];
    this.posY = Star.ySeed();
    this.currentStar = Star.seedStar();

    this.updatePosition();
  }

  static ySeed() {
    return Math.random() * (Star.yRange[0] - Star.yRange[1]) + Star.yRange[1];
  }

  static seedStar() {
    return Math.floor(Math.random() * (3-0));
  }

  spriteY() {
    return this.actorProperties['y'] + (this.actorProperties['height'] * this.currentStar);
  }

  updatePosition() {
    if(this.gameInstance.isGameOver || !this.active ) return;
    this.posX -= 0.2;
    if(this.x()+this.width() < 0) {
      this.gameInstance.lastTimeoutId = setTimeout(() => {
        this.posX = this.sceneSize['width'];
        this.posY = Star.ySeed();
        this.currentStar = Star.seedStar();
        requestAnimationFrame(this.updatePosition.bind(this));
      }, 42000);
    } else {
      requestAnimationFrame(this.updatePosition.bind(this));
    }
  }
}

export default Star;