import Actor from './actor';

class Cactus extends Actor {
  constructor(name, gameInstance) {
    super(name, gameInstance);

    this.posX = this.sceneSize['width'];
    this.posY = this.sceneSize['height']-this.actorProperties['height'];
    this.cactusPosition = this.positionSeed();
    this.cactusCount = 1;
  }

  spriteX() {
    return this.actorProperties['x'] + this.cactusPosition;
  }
  
  width() {
    return (this.actorProperties['width']/6)*this.cactusCount;
  }

  positionSeed() {
    const positions = [0, this.actorProperties['width']/2];
    return positions[Math.floor(Math.random() * positions.length)];
  }

  static countSeed(){
    const items = [1,1,1,1,2,2,2,3,3];
    return Math.ceil((Math.random() * items[Math.floor(Math.random() * items.length)] -1)+1);
  }

  drawCoordinates () {
    return [[
      this.spriteX(),
      this.spriteY(),
      this.width(),
      this.height(),
      this.x(),
      this.y(),
      this.width(),
      this.height()
    ]];
  }

  show() {
    this.posX = this.sceneSize['width'];
    this.cactusCount = Cactus.countSeed();
    this.cactusPosition = this.positionSeed();
    this.updatePosition();
  }

  updatePosition() {
    if(this.gameInstance.isGameOver || !this.active ) return;
    if(this.isOverlappedBy(this.gameInstance.character)) {
      this.gameInstance.gameOver();
    }

    this.posX -= this.gameInstance.speed;

    if(this.x()+this.width() < 0)
      this.gameInstance.obstaclesQueue.add(this);
    else
      requestAnimationFrame(this.updatePosition.bind(this));
  }
}

export default Cactus;