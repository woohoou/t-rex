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

  /**
   * Get the first or second part of the sprite image
   */
  positionSeed() {
    const positions = [0, this.actorProperties['width']/2];
    return positions[Math.floor(Math.random() * positions.length)];
  }

  /**
   * Define the frequency distribution number of the cactus (how many cactus spawn togeter)
   */
  static countSeed(){
    const items = [1,1,1,1,2,2,2,3,3];
    return Math.ceil((Math.random() * items[Math.floor(Math.random() * items.length)] -1)+1);
  }

  /**
   * Trigger the actor in scene from right to left
   */
  show() {
    this.posX = this.sceneSize['width'];
    this.cactusCount = Cactus.countSeed();
    this.cactusPosition = this.positionSeed();
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

    this.posX -= this.gameInstance.speed;

    if(this.x()+this.width() < 0)
      this.gameInstance.obstaclesQueue.add(this);
    else
      requestAnimationFrame(this.updatePosition.bind(this));
  }
}

export default Cactus;