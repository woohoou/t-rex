import pressSound from '../assets/sounds/press.ogx';
import reachSound from '../assets/sounds/reach.ogx';
import hitSound from '../assets/sounds/hit.ogx';

class SoundFx {
  constructor() {
    this.press = new Audio()
    this.press.src = pressSound;

    this.reach = new Audio()
    this.reach.src = reachSound;

    this.hit = new Audio()
    this.hit.src = hitSound;
  }

  playSound(sound) {
    switch(sound) {
      case 'PRESS':
        this.press.play();
        break;
      case 'HIT':
        this.hit.play();
        break;
      case 'REACH':
        this.reach.play();
        break;
      default:
        break;
    }
  }
}

export default SoundFx;