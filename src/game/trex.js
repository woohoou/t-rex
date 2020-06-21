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
    this.animate();
  }

  changeState(state) {
    this.state = state;
  }

  actorX() {
    return 20;
  }

  actorY() {
    return this.offsetY + this.sceneSize['height'] - this.actorHeight();
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

  actorWidth() {
    if(this.state === 'DOWN')
      return this.actorProperties['width'] + this.actorProperties['widthDiff'];
    else
      return this.actorProperties['width'];
  }

  actorHeight() {
    if(this.state === 'DOWN')
      return this.actorProperties['height'] - this.actorProperties['heightDiff'];
    else
      return this.actorProperties['height']
  }

  animate() {
    setTimeout(() => {
      this.position = !this.position
      this.animate();
    }, 300-(this.gameInstance.speed*10));
  }

  drawCoordinates () {
    return [[
      this.spriteX(),
      this.spriteY(),
      this.actorWidth(),
      this.actorHeight(),
      this.actorX(),
      this.actorY(),
      this.actorWidth(),
      this.actorHeight(),
    ]];
  }

  raise() {
    if(this.offsetY > (this.sceneSize['height']/4)*-2) {
      this.offsetY -= 5;
      requestAnimationFrame(this.raise.bind(this));
    } else this.fall();
  }

  fall () {
    if(this.offsetY < 0) {
      this.offsetY += 5;
      requestAnimationFrame(this.fall.bind(this));
    } else this.isJumping = false;
  }

  jump() {
    this.raise()
  }

  /**
   * Handle game input actions
   * @param {String} action 
   */
  handleInput(action, keyAction) {
    switch(action) {
      case 'DOWN':
        if(keyAction === 'keydown') {
          this.state = 'DOWN';
        } else if(keyAction === 'keyup') {
          this.state = 'RUNNING'; 
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