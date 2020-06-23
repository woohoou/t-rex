import Actor from './actor';

class Horizon extends Actor {;
  constructor(gameInstance) {
    super('HORIZON', gameInstance);

    this.posX = 0;
    this.posY = this.sceneSize['height']-this.height();

    this.updatePosition();
  }

  /**
   * Update the position of the actor in canvas
   */
  updatePosition() {
    if(this.gameInstance.isGameOver || !this.active ) return;
    this.posX += this.gameInstance.speed;
    requestAnimationFrame(this.updatePosition.bind(this));
  }

  /**
   * Get the coordinates of the one or two horizon images
   */
  drawCoordinates () {
    // Restart x position counter
    if(this.spriteX()+this.x() >= this.width())
      this.posX = 0;
    
    // Main horizon image
    let coordinates = [[
      this.spriteX()+this.x(),
      this.spriteY(),
      this.sceneSize['width'],
      this.height(),
      0,
      this.y(),
      this.sceneSize['width'],
      this.height()
    ]];
    // Auxiliar horizon image (when the main is finish)
    if(this.spriteX()+this.x()+this.sceneSize['width'] >= this.width()) {
      coordinates.push([
        this.spriteX()+this.x()-this.width(),
        this.spriteY(),
        this.sceneSize['width'],
        this.height(),
        0,
        this.y(),
        this.sceneSize['width'],
        this.height()
      ])
    }
    return coordinates;
  }
}

export default Horizon;