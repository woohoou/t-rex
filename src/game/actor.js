import { sceneDefinition, spriteDefinition } from './definitions';

/**
 * Base class of all actors
 */
class Actor {
  sceneSize = sceneDefinition['SIZE'];
  spriteSize = spriteDefinition['SIZE'];
  active = true;
  posX = 0;
  posY = 0;
  static spawnRange = [2, 0];

  /**
   * Initialize required properties
   * @param {String} name 
   * @param {Game} gameInstance 
   */
  constructor(name, gameInstance) {
    this.name = name;
    this.gameInstance = gameInstance;
    this.actorProperties = spriteDefinition[name];
  }

  spriteX() {
    return this.actorProperties['x'];
  }

  spriteY() {
    return this.actorProperties['y'];
  }

  x() {
    return this.posX;
  }

  y() {
    return this.posY;
  }

  width() {
    return this.actorProperties['width'];
  }

  height() {
    return this.actorProperties['height'];
  }

  coordinates() {
    return [[this.x(), this.y()], [this.x()+this.width(), this.y()+this.height()]];
  }

  isOverlappedBy(actor) {
    const coord1 = this.coordinates();
    const coord2 = actor.coordinates();

    const l1 = { x: coord1[0][0], y: coord1[0][1] };
    const r1 = { x: coord1[1][0], y: coord1[1][1] };
    const l2 = { x: coord2[0][0], y: coord2[0][1] };
    const r2 = { x: coord2[1][0], y: coord2[1][1] };

   return r1.x >= l2.x && l1.x <= r2.x && l1.y <= r2.y && r1.y >= l2.y;
  }

  /**
   * Get spaen
   */
  static spawnSeed() {
    return Math.random() * (this.spawnRange[0]-this.spawnRange[1]) + this.spawnRange[1];
  }

  /**
   * Get the coordinates to draw the element in canvas
   */
  drawCoordinates() {
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
}

export default Actor;