import Actor from './actor';

class Score extends Actor {
  constructor(gameInstance) {
    super('NUMBER', gameInstance);
    this.highScore = 0;
    this.currentScore = 0;
    this.lastHundredScore = 0;
    this.blink = false;
    this.blinkCounter = 0;
    this.hideCurrentScore = false;
    this.posX = (this.sceneSize['width']/3)*2;
    this.posY = this.sceneSize['height']/6;
  }

  blinkScore() {
    if(!this.gameInstance.isGameOver) {
      this.blink = true;
      this.hideCurrentScore = !this.hideCurrentScore;
      if(this.blinkCounter === 0)
        this.gameInstance.soundFx.playSound('REACH');
      ++this.blinkCounter;
      this.gameInstance.lastTimeoutId = setTimeout(() => {
        if(this.blinkCounter === 6) {
          this.blink = false;
          this.blinkCounter = 0;
        } else {
          this.blinkScore();
        }
      }, 300);
    }
  }

  drawCoordinates() {
    let coordinates = [];

    // High score
    let score = this.highScore;
    for(let i = 4 ; i >= 0; --i) {
      let digit = Math.floor(score / Math.pow(10, i));
      coordinates.push(
        [
          this.spriteX()+(this.width() * digit),
          this.spriteY(),
          this.width(),
          this.height(),
          this.x()+(this.width()*4)-(this.width()*i),
          this.y(),
          this.width(),
          this.height()
        ]
      )
      score -= digit*Math.pow(10, i);
    }

    // HI
    for(let i = 5 ; i <= 6 ; ++i) {
      coordinates.push(
        [
          this.spriteX()+(this.width()*(i+5)),
          this.spriteY(),
          this.width(),
          this.height(),
          this.x()+(this.width()*i),
          this.y(),
          this.width(),
          this.height()
        ]
      )
    }

    // Score
    if(!this.hideCurrentScore) {
      score = this.currentScore;
      for(let i = 4 ; i >= 0; --i) {
        let digit = Math.floor(score / Math.pow(10, i));

        if(i === 2) {
          if(digit !== this.lastHundredScore) {
            this.blinkScore();
          }
          this.lastHundredScore = digit;
        }
        if(this.blink && i <= 1) {
          coordinates.push(
            [
              this.spriteX(),
              this.spriteY(),
              this.width(),
              this.height(),
              this.x()+(this.width()*11)-(this.width()*i),
              this.y(),
              this.width(),
              this.height()
            ]
          )
        } else {
          coordinates.push(
            [
              this.spriteX()+(this.width() * digit),
              this.spriteY(),
              this.width(),
              this.height(),
              this.x()+(this.width()*11)-(this.width()*i),
              this.y(),
              this.width(),
              this.height()
            ]
          )
        }
        score -= digit*Math.pow(10, i);
      }
    }
    
    return coordinates;
  }
}

export default Score;