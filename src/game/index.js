import sprite from '../assets/images/100-offline-sprite.png';
import { sceneDefinition } from './definitions';
import { generateInputEvents } from './input';
import Horizon from './horizon';
import Cloud from './cloud';
import CactusSmall from './cactus-small';
import CactusLarge from './cactus-large';
import Pterodactyl from './pterodactyl';
import Trex from './trex';
import SoundFx from './soundfx';

/**
 * Main game class that manages all the game logic
 */
class Game {
  /**
   * Initialize the game instance drawing all the elements needed
   */
  constructor() {
    let canvas = document.querySelector('.runner-canvas');
    this.ctx = canvas.getContext('2d');
    this.image = new Image();
    this.image.src = sprite;
    this.image.onload = this.initialize.bind(this);
    this.soundFx = new SoundFx();
    this.levelDuration = 15;
    this.firstTimeoutId = null;
    this.lastTimeoutId = null;
    generateInputEvents(this);
  }

  /**
   * Generate all actors in scene
   */
  initialize() {
    this.speed = 5;
    this.score = 0;
    this.actors = [];
    this.removePendingActions();

    this.actors.push(new Horizon(this));
    this.draw();
    this.increaseSpeed();
    this.generateClouds();
    this.generateCactus();
    this.generatePterodactyls();
    this.character = new Trex(this);
    this.actors.push(this.character);
  }

  /**
   * Remove pending spawns
   */
  removePendingActions() {
    if(this.firstTimeoutId && this.lastTimeoutId) {
      while(this.lastTimeoutId >= this.firstTimeoutId) {
        clearTimeout(this.lastTimeoutId)
        --this.lastTimeoutId;
      }
    }
  }
 
  /**
   * Generate 7 random clouds
   * When the clouds are not in scene spawn again between 3 and 10 seconds
   */
  generateClouds() {
    for(let i = 0; i < 5 ; ++i) {
      const timeoutId = setTimeout(() => {
        this.actors.push(new Cloud(this));
      }, Cloud.spawnSeed()*1000*i);
      this.lastTimeoutId = timeoutId;
    }
  }

  /**
   * Generate 5 cactus 3 small and 2 large of different sizes
   */
  generateCactus() {
    for(let i = 0; i < 4 ; ++i) {
      if(i < 2) {
        const timeoutId = setTimeout(() => {
          this.actors.push(new CactusSmall(this));
        }, CactusSmall.spawnSeed()*1000*(i+1));  
        this.lastTimeoutId = timeoutId;
      } else {
        const timeoutId = setTimeout(() => {
          this.actors.push(new CactusLarge(this));
        }, CactusLarge.spawnSeed()*1000*(i+1));  
        this.lastTimeoutId = timeoutId;
      }
    }
  }

  generatePterodactyls() {
    for(let i = 0; i < 3 ; ++i) {
      const timeoutId = setTimeout(() => {
        this.actors.push(new Pterodactyl(this));
      }, Pterodactyl.spawnSeed()*1000);
      this.lastTimeoutId = timeoutId;
    }
  }

  /**
   * Increase game speed n seconds
   */
  increaseSpeed() {
    const timeoutId = setInterval(() => ++this.speed, 1000*this.levelDuration);
    if(!this.firstTimeoutId) this.firstTimeoutId = timeoutId;
    this.lastTimeoutId = timeoutId;
  }

  /**
   * Handle game input actions
   * @param {String} action 
   */
  handleInput(action, keyAction) {
    switch(action) {
      case 'RESTART':
        if(keyAction === 'keyup') {
          this.soundFx.playSound('REACH');
          this.initialize();
        }
        break;
      default:
        break;
    }
  }

  /**
   * Draw all actors in scene
   */
  draw() {
    this.ctx.clearRect(0, 0, sceneDefinition['SIZE']['width'], sceneDefinition['SIZE']['height']);
    for(let actor of this.actors) {
      for(let coordinates of actor.drawCoordinates()) {
        this.ctx.drawImage(...[this.image,...coordinates]);
      }
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}

export default Game;