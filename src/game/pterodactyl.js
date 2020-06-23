import Actor from './actor';

class Pterodactyl extends Actor {
  static yRange = [100, 30]
  static speedRange = [0.5, -0.5]

  constructor(gameInstance) {
    super('PTERODACTYL', gameInstance);

    this.posX = this.sceneSize['width'];
    this.posY = Pterodactyl.ySeed();

    this.wingsOpen = false;
    this.speed = this.gameInstance.speed + Pterodactyl.speedSeed();
    this.animate();
  }

  /**
   * Calculate the "y" coordinate of the cloud spawned
   */
  static ySeed() {
    return Math.random() * (this.yRange[0] - this.yRange[1]) + this.yRange[1];
  }

  /**
   * Calculate the speed of the actor spawned from right to left
   */
  static speedSeed() {
    return Math.random() * (this.speedRange[0] - this.speedRange[1]) + this.speedRange[1];
  }

  /**
   * Animate the wings of the actor
   */
  animate() {
    this.gameInstance.lastTimeoutId = setTimeout( () => {
      this.wingsOpen = !this.wingsOpen
      this.animate();
    }, 250);
  }

  spriteX() {
    if(this.wingsOpen) {
      return this.actorProperties['x']+this.width();
    } else {
      return this.actorProperties['x'];
    }
  }

  spriteY() {
    if(this.wingsOpen) {
      return this.actorProperties['yWingsOpen'];
    } else {
      return this.actorProperties['y'];
    }
  }

  y() {
    if(this.wingsOpen) {
      return this.posY - 6;
    } else {
      return this.posY;
    }
  }

  height() {
    if(this.wingsOpen) {
      return this.actorProperties['heightWingsOpen'];
    } else {
      return this.actorProperties['height'];
    }
  }

  /**
   * Trigger the actor in scene from right to left
   */
  show() {
    this.posX = this.sceneSize['width'];
    this.speed = this.gameInstance.speed + Pterodactyl.speedSeed();
    this.posY = Pterodactyl.ySeed();
    this.updatePosition();
  }

  /**
   * Update the position of the actor in canvas
   */
  updatePosition() {
    if(this.gameInstance.isGameOver || !this.active ) return;
    if(this.isOverlappedBy(this.gameInstance.character)) {
      this.gameInstance.gameOver();
    }

    this.posX -= this.speed;

    if(this.x()+this.width() < 0)
      this.gameInstance.obstaclesQueue.add(this);
    else
      requestAnimationFrame(this.updatePosition.bind(this));
  }
}

export default Pterodactyl;