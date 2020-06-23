import Actor from './actor';

class Trex extends Actor {
  STATES = {
    STAND: 'STAND',
    RUNNING: 'RUNNING',
    JUMPING: 'JUMPING',
    DEATH: 'DEATH',
    DOWN: 'DOWN'
  };

  STATE_POSITION = {
    STAND_0: 0,
    STAND_1: 1,
    JUMPING_0: 0,
    JUMPING_1: 0,
    RUNNING_0: 2,
    RUNNING_1: 3,
    DEATH_0: 4,
    DEATH_1: 5,
    DOWN_0: 6,
    DOWN_1: 7
  };

  state = 'RUNNING';
  isJumping = false;
  offsetY = 0;
  position = false;
  
  constructor(gameInstance) {
    super('TREX', gameInstance);
    this.extraFallSpeed = false;
    this.animate();
  }

  changeState(state) {
    this.state = state;
  }

  x() {
    return 20;
  }

  y() {
    return this.offsetY + this.sceneSize['height'] - this.height();
  }

  spriteX() {
    if(this.state === 'DOWN') {
      let x = this.actorProperties['x'];
      x += (6 * this.actorProperties['width']);
      x += (this.STATE_POSITION[(this.state+'_'+((!this.position) ? '0' : '1'))]-6) * (this.actorProperties['width']+this.actorProperties['widthDiff']);
      return x;
    } else
      return this.actorProperties['x']+(this.STATE_POSITION[(this.state+'_'+((!this.position) ? '0' : '1'))] * this.actorProperties['width'])
  }

  spriteY() {
    if(this.state === 'DOWN')
      return this.actorProperties['y']+this.actorProperties['heightDiff'];
    else
      return this.actorProperties['y'];
  }

  width() {
    if(this.state === 'DOWN')
      return this.actorProperties['width'] + this.actorProperties['widthDiff'];
    else
      return this.actorProperties['width'];
  }

  height() {
    if(this.state === 'DOWN')
      return this.actorProperties['height'] - this.actorProperties['heightDiff'];
    else
      return this.actorProperties['height']
  }

  animate() {
    this.gameInstance.lastTimeoutId = setTimeout(() => {
      this.position = !this.position
      this.animate();
    }, 200-(this.gameInstance.speed*10));
  }

  coordinates() {
    // Decrease sensibility in overlapping
    let x = this.x() + 15;
    let width = this.width()-30;
    let y = this.y() + 10;
    let height = this.height()-20;

    if(this.state === 'DOWN') {
      y = this.y() + 5;
      height = this.height()-10;
    }
    return [[x, y], [x+width, y+height]];
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
      this.height(),
    ]];
  }

  raise() {
    if(this.offsetY > -1*(this.sceneSize['height']-(this.height()*1.5)) && !this.extraFallSpeed) {
      this.offsetY -= 4;
      requestAnimationFrame(this.raise.bind(this));
    } else this.fall();
  }

  fall () {
    if(this.offsetY < 0) {
      this.offsetY += 4;
      if(this.extraFallSpeed) this.offsetY += 3;
      requestAnimationFrame(this.fall.bind(this));
    } else {
      this.offsetY = 0;
      this.isJumping = false;
    }
  }

  jump() {
    this.raise()
  }

  /**
   * Handle game input actions
   * @param {String} action 
   */
  handleInput(action, keyAction) {
    if(this.gameInstance.isGameOver) return;
    switch(action) {
      case 'DOWN':
        if(keyAction === 'keydown') {
          this.state = 'DOWN';
          this.extraFallSpeed = true;
        } else if(keyAction === 'keyup') {
          this.state = 'RUNNING'; 
          this.extraFallSpeed = false;
        }
        break;
      case 'JUMP':
        if(keyAction === 'keydown') {
          if(!this.isJumping) {
            this.isJumping = true;
            this.gameInstance.soundFx.playSound('PRESS');
            this.jump();
          }
        }
        break;
      default:
        break;
    }
  }
}

export default Trex;