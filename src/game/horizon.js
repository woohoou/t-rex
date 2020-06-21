import Actor from './actor';

class Horizon extends Actor {;
  constructor(gameInstance) {
    super('HORIZON', gameInstance);

    this.x = 0;
    this.y = this.sceneSize['height']-this.actorProperties['height'];

    this.updatePosition();
  }

  updatePosition() {
    this.x += this.gameInstance.speed;
    requestAnimationFrame(this.updatePosition.bind(this));
  }

  /**
   * Get the coordinates of the one or two horizon images
   */
  drawCoordinates () {
    // Restart x position counter
    if(this.actorProperties['x']+this.x >= this.actorProperties['width'])
      this.x = 0;
    
    // Main horizon image
    let coordinates = [[
      this.actorProperties['x']+this.x,
      this.actorProperties['y'],
      this.sceneSize['width'],
      this.actorProperties['height'],
      0,
      this.y,
      this.sceneSize['width'],
      this.actorProperties['height']
    ]];
    // Auxiliar horizon image (when the main is finish)
    if(this.actorProperties['x']+this.x+this.sceneSize['width'] >= this.actorProperties['width']) {
      coordinates.push([
        this.actorProperties['x']+this.x-this.actorProperties['width'],
        this.actorProperties['y'],
        this.sceneSize['width'],
        this.actorProperties['height'],
        0,
        this.y,
        this.sceneSize['width'],
        this.actorProperties['height']
      ])
    }
    return coordinates;
  }
}

export default Horizon;