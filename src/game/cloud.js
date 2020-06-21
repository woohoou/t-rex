import Actor from './actor';

class Cloud extends Actor {;
  static spawnRange = [10, 3];
  static yRange = [100, 10]

  constructor(gameInstance) {
    super('CLOUD', gameInstance);

    this.x = this.sceneSize['width'];
    this.y = Cloud.ySeed();

    this.updatePosition();
  }

  static ySeed() {
    return Math.floor(Math.random() * (Cloud.yRange[0] - Cloud.yRange[1]) + Cloud.yRange[1]);
  }

  updatePosition() {
    this.x -= 0.5;
    if(this.x+this.actorProperties['width'] < 0) {
      setTimeout(() => {
        this.x = this.sceneSize['width'];
        this.y = Cloud.ySeed();
        requestAnimationFrame(this.updatePosition.bind(this));
      }, Cloud.spawnSeed() * 1000);
    } else {
      requestAnimationFrame(this.updatePosition.bind(this));
    }
  }
}

export default Cloud;