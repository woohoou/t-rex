import React from 'react';
import { connect } from 'react-redux';
import { sceneDefinition } from '../game/definitions';
import Game from '../game';
import ProgressBar from './ProgressBar';

/**
 * The canvas component
 */
class Scene extends React.Component {
  game = null;
  progressBarTimeoutId = null;

  constructor(props) {
    super(props);
    this.state = { levelProgress: 0 }
  }

  static defaultProps = {
    level: 0
  }

  /**
   * Observe props update
   * 1. Start / stop game
   * 2. Level up
   * @param {Object} prevProps 
   * @param {Object} prevState 
   * @param {Object} snapshot 
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.isPlaying && !this.game) {
      this.game = new Game();
      this.game.dispatch = this.props.dispatch;
    } else if(!this.props.isPlaying) {
      if(this.game) this.game.gameOver();
      this.game = null;
    }

    if(this.props.level !== prevProps.level) {
      this.setState({ levelProgress: 0 })
      clearTimeout(this.progressBarTimeoutId);
      this.startTiming();
    }
  }

  /**
   * Increment progress bar percentage
   */
  startTiming() {
    if(this.props.level > 0 && this.game && !this.game.isGameOver) {
      this.progressBarTimeoutId = setTimeout( () => {
        if(this.state.levelProgress < 100) {
          this.setState({
            levelProgress: this.state.levelProgress+1
          })
          this.startTiming();
        }
      }, (this.game.levelDuration*1000/100));
    }
  }

  /**
   * Render the level, level progress bar and canvas
   */
  render() {
    if(this.props.isPlaying)
      return (
        <div id="scene" style={{marginTop: '25px'}}>
          <center>Level: {this.props.level}</center>
          <div style={{width: sceneDefinition['SIZE']['width'], marginLeft: 'auto', marginRight: 'auto', marginBottom: '25px'}}>
            <ProgressBar progress={this.state.levelProgress}></ProgressBar>
          </div>
          <canvas className="runner-canvas" width={sceneDefinition['SIZE']['width']} height={sceneDefinition['SIZE']['height']}></canvas>
        </div>
      );
    else return null;
  }
}

const mapStateToProps = state => ({
  isPlaying: state.game.isPlaying,
  level: state.game.level
});

export default connect(mapStateToProps)(Scene);