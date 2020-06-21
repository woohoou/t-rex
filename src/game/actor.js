import { sceneDefinition, spriteDefinition } from './definitions';

/**
 * Base class of all actors
 */
class Actor {
  sceneSize = sceneDefinition['SIZE'];
  spriteSize = spriteDefinition['SIZE'];
  x = 0;
  y = 0;
  static spawnRange = [1, 1];

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

  /**
   * Get spaen
   */
  static spawnSeed() {
    return Math.random() * (this.spawnRange[0]-this.spawnRange[1]) + this.spawnRange[1];
  }

  /**
   * Get the coordinates to draw the element in canvas
   */
  drawCoordinates () {
    return [[
      this.actorProperties['x'],
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

export default Actor;