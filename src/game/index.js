import { increaseLevel as increaseLevelAction } from '../actions';
import sprite from '../assets/images/100-offline-sprite.png';
import { sceneDefinition } from './definitions';
import { generateInputEvents } from './input';
import Score from './score';
import Horizon from './horizon';
import Cloud from './cloud';
import Moon from './moon';
import Star from './star';
import Actor from './actor';
import CactusSmall from './cactus-small';
import CactusLarge from './cactus-large';
import Pterodactyl from './pterodactyl';
import Trex from './trex';
import SoundFx from './soundfx';
import Queue from '../utils/queue';
import GameOver from './game-over';
import Restart from './restart';

/**
 * Main game class, manages all the game logic.
 */
class Game {
  /**
   * Initialize the game instance drawing all the elements needed
   */
  constructor() {
    this.canvas = document.querySelector('.runner-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.dispatch = null;
    this.image = new Image();
    this.image.src = sprite;
    this.initializeCallback = this.initialize.bind(this);
    this.image.onload = this.initializeCallback;
    this.soundFx = new SoundFx();
    this.levelDuration = 15;
    this.firstTimeoutId = null;
    this.lastTimeoutId = null;
    this.actors = [];
    this.obstaclesQueue = new Queue()
    this.debug = false;
    generateInputEvents(this);
  }

  /**
   * Generate all actors in scene, config, score, queues
   */
  initialize() {
    // Setup
    this.isGameOver = false;
    this.actors = [];
    this.obstaclesQueue.clear();
    this.restartLevel();
    this.increaseLevel();
    this.removeListeners();
    this.removePendingActions();

    // Start new game
    this.soundFx.playSound('REACH');

    // Speed
    this.speed = 5;
    this.increaseSpeed();

    // Obstacles
    this.generateCactus();
    this.generatePterodactyls();
    let obstacles = this.actors.sort(() => Math.random() - 0.5);
    obstacles.forEach((item) => this.obstaclesQueue.add(item));
    this.showObstacle();

    // Scene
    this.actors.push(new Horizon(this));
    this.generateClouds();
    this.generateSky();

    // Character
    this.character = new Trex(this);

    // Score
    this.score = new Score(this);
    let highScore = parseInt(localStorage.getItem('highScore'));
    if(highScore) this.score.highScore = highScore;
    this.increaseScore();

    // Draw
    this.draw();
  }

  /**
   * Remove last game listeners
   */
  removeListeners() {
    this.canvas.removeEventListener('click', this.initializeCallback, false);
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
   * Generate random clouds
   */
  generateClouds() {
    for(let i = 0; i < 5 ; ++i) {
      this.lastTimeoutId = setTimeout(() => {
        this.actors.push(new Cloud(this));
      }, Cloud.spawnSeed()*1000*i);
    }
  }

  /**
   * Generate moon and stars
   */
  generateSky() {
    for(let i = 0 ; i < 2 ; ++i) {
      this.lastTimeoutId = setTimeout( () => this.actors.push(new Star(this)), 21000 + (i * 4000));
    }
    this.lastTimeoutId = setTimeout( () => this.actors.push(new Moon(this)), 21000 + 12000);
    for(let i = 3 ; i < 5 ; ++i) {
      this.lastTimeoutId = setTimeout( () => this.actors.push(new Star(this)), 21000 + 12000 + (i * 4000))
    }
  }

  /**
   * Generate random small and large cactus
   */
  generateCactus() {
    for(let i = 0; i < 15 ; ++i) {
      if(i < 10) {
        const actor = new CactusSmall(this)
        this.actors.push(actor);
      } else {
        const actor = new CactusLarge(this)
        this.actors.push(actor);
      }
    }
  }

  /**
   * Generate random pterodactyl actors
   */
  generatePterodactyls() {
    for(let i = 0; i < 4 ; ++i) {
      const actor = new Pterodactyl(this)
      this.actors.push(actor);
    }
  }

  /**
   * Restart the game calling initialize function
   */
  restartGame() {
    this.gameOver();
    this.initialize();
  }

  /**
   * Create game over state game
   */
  gameOver() {
    this.soundFx.playSound('HIT');
    this.character.state = 'DEATH';
    this.isGameOver = true;
    
    // Save higher score if is greater
    let highScore = parseInt(localStorage.getItem('highScore'));
    if(highScore < this.score.currentScore || !highScore)
      localStorage.setItem('highScore', this.score.currentScore);

    this.actors.push(new GameOver(this));
    this.actors.push(new Restart(this));

    this.canvas.addEventListener('click', this.initializeCallback, false);
      
    this.actors.forEach((item) => item.active = false);
  }

  /**
   * Set level to 0 and dispatch to state
   */
  restartLevel() {
    this.level = 0;
    this.dispatch(increaseLevelAction(this.level));
  }

  /**
   * Initialize if level does not exist and increase by 1 and dispatch to state
   */
  increaseLevel() {
    if(!this.level)
      this.level = 1;
    else
      ++this.level;
    this.dispatch(increaseLevelAction(this.level));
  }
 
  /**
   * Increase game speed n (levelDuration config) seconds
   */
  increaseSpeed() {
    this.lastTimeoutId = setInterval(() => {
      this.increaseLevel();
      ++this.speed;
    }, 1000*this.levelDuration);
    if(!this.firstTimeoutId) this.firstTimeoutId = this.lastTimeoutId;
  }

  /**
   * Increase the score by 1 each 100ms
   */
  increaseScore() {
    this.lastTimeoutId = setTimeout(() => {
      if(!this.isGameOver) {
        ++this.score.currentScore;
        this.increaseScore();
      }
    }, 100);
  }

  /**
   * Handle game input actions
   * @param {String} action 
   */
  handleInput(action, keyAction) {
    switch(action) {
      case 'RESTART':
        if(keyAction === 'keyup') {
          this.restartGame();
        }
        break;
      default:
        break;
    }
  }
  
  /**
   * Manage the obstacles using obstaclesQueue
   */
  showObstacle() {
    const next = this.obstaclesQueue.next();
    let waitTime = 600;
    if(next && next.name === 'PTERODACTYL')
      waitTime = 400;
    this.lastTimeoutId = setTimeout(() => {
      const actor = this.obstaclesQueue.remove()
      if(actor && !this.isGameOver) {
        actor.show();
        this.showObstacle();
      }
    }, waitTime+(Actor.spawnSeed()*1000));
  }

  /**
   * Draw all actors in scene
   */
  draw() {
    this.ctx.clearRect(0, 0, sceneDefinition['SIZE']['width'], sceneDefinition['SIZE']['height']);
    for(let actor of this.actors) {
      for(let coordinates of actor.drawCoordinates()) {
        if(this.debug && actor.name !== 'HORIZON') {
          const actorCoords = actor.coordinates();
          this.ctx.beginPath();
          this.ctx.strokeStyle = "blue";
          this.ctx.arc(actorCoords[0][0], actorCoords[0][1], 2, 0, 2*Math.PI, false);
          this.ctx.arc(actorCoords[1][0], actorCoords[0][1], 2, 0, 2*Math.PI, false);
          this.ctx.arc(actorCoords[1][0], actorCoords[1][1], 2, 0, 2*Math.PI, false);
          this.ctx.arc(actorCoords[0][0], actorCoords[1][1], 2, 0, 2*Math.PI, false);
          this.ctx.arc(actorCoords[0][0], actorCoords[0][1], 2, 0, 2*Math.PI, false);
          this.ctx.stroke();
        }
        this.ctx.drawImage(...[this.image,...coordinates]);
      }
    }
    if(this.score)
      for(let coordinate of this.score.drawCoordinates())
        this.ctx.drawImage(...[this.image,...coordinate]);
    if(this.character)
      for(let coordinate of this.character.drawCoordinates())
        this.ctx.drawImage(...[this.image,...coordinate]);
    if(!this.isGameOver) requestAnimationFrame(this.draw.bind(this));
  }
}

export default Game;