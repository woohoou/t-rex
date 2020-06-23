import Actor from './actor';

class Cloud extends Actor {
  static spawnRange = [10, 3];
  static yRange = [100, 10]

  constructor(gameInstance) {
    super('CLOUD', gameInstance);

    this.posX = this.sceneSize['width'];
    this.posY = Cloud.ySeed();

    this.updatePosition();
  }

  /**
   * Calculate the "y" coordinate of the cloud spawned
   */
  static ySeed() {
    return Math.random() * (Cloud.yRange[0] - Cloud.yRange[1]) + Cloud.yRange[1];
  }

  /**
   * Update the position of the actor in canvas
   */
  updatePosition() {
    if(this.gameInstance.isGameOver || !this.active ) return;
    this.posX -= 0.5;
    if(this.x()+this.width() < 0) {
      this.gameInstance.lastTimeoutId = setTimeout(() => {
        this.posX = this.sceneSize['width'];
        this.posY = Cloud.ySeed();
        requestAnimationFrame(this.updatePosition.bind(this));
      }, Cloud.spawnSeed() * 1000);
    } else {
      requestAnimationFrame(this.updatePosition.bind(this));
    }
  }
}

export default Cloud;