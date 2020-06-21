import Actor from './actor';

class Cactus extends Actor {;
  static spawnRange = [7, 4];

  constructor(name, gameInstance) {
    super(name, gameInstance);

    this.x = this.sceneSize['width'];
    this.y = this.sceneSize['height']-this.actorProperties['height'];
    this.cactusCount = 1;

    this.updatePosition();
  }
  
  width() {
    return (this.actorProperties['width']/6)*this.cactusCount;
  }

  static countSeed(){
    return Math.floor((Math.random() * (3-1)+1));
  }

  drawCoordinates () {
    return [[
      this.actorProperties['x'],
      this.actorProperties['y'],
      this.width(),
      this.actorProperties['height'],
      this.x,
      this.y,
      this.width(),
      this.actorProperties['height']
    ]];
  }

  updatePosition() {
    this.x -= this.gameInstance.speed;
    if(this.x+this.width() < 0) {
      setTimeout(() => {
        this.x = this.sceneSize['width'];
        this.cactusCount = Cactus.countSeed();
        requestAnimationFrame(this.updatePosition.bind(this));
      }, Cactus.spawnSeed() * 1000);
    } else {
      requestAnimationFrame(this.updatePosition.bind(this));
    }
  }
}

export default Cactus;