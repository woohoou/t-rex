import Actor from './actor';

class Pterodactyl extends Actor {
  static spawnRange = [20, 5];
  static yRange = [100, 30]
  static speedRange = [0.5, -0.5]

  constructor(gameInstance) {
    super('PTERODACTYL', gameInstance);

    this.x = this.sceneSize['width'];
    this.y = Pterodactyl.ySeed();

    this.upWingsDirection = false;
    this.speed = this.gameInstance.speed + Pterodactyl.speedSeed();
    this.updatePosition();
    this.animate();
  }

  static ySeed() {
    return Math.floor(Math.random() * (this.yRange[0] - this.yRange[1]) + this.yRange[1]);
  }

  static speedSeed() {
    return Math.floor(Math.random() * (this.speedRange[0] - this.speedRange[1]) + this.speedRange[1]);
  }

  animate() {
    setTimeout( () => {
      this.upWingsDirection = !this.upWingsDirection
      this.animate();
    }, 250);
  }

  updatePosition() {
    this.x -= this.speed;
    if(this.x+this.actorProperties['width'] < 0) {
      setTimeout(() => {
        this.x = this.sceneSize['width'];
        this.speed = this.gameInstance.speed + Pterodactyl.speedSeed();
        this.y = Pterodactyl.ySeed();
        requestAnimationFrame(this.updatePosition.bind(this));
      }, Pterodactyl.spawnSeed() * 1000);
    } else {
      requestAnimationFrame(this.updatePosition.bind(this));
    }
  }

  drawCoordinates () {
    return [[
      this.actorProperties['x']+(this.upWingsDirection ? this.actorProperties['width'] : 0),
      this.actorProperties['y'],
      this.actorProperties['width'],
      this.actorProperties['height'],
      this.x,
      this.y,
      this.actorProperties['width'],
      this.actorProperties['height']
    ]];
  }
}

export default Pterodactyl;