import React from 'react';
import { connect } from 'react-redux';
import { sceneDefinition } from '../game/definitions';
import Game from '../game';

class Scene extends React.Component {
  game = null;

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.isRunning && !this.game)
      this.game = new Game();
    else if(!this.props.isRunning)
      this.game = null;
  }

  render() {
    if(this.props.isRunning)
      return (
        <div id="scene">
          <canvas className="runner-canvas" width={sceneDefinition['SIZE']['width']} height={sceneDefinition['SIZE']['height']}></canvas>
        </div>
      );
    else return null;
  }
}

const mapStateToProps = state => ({
  isRunning: state.game.isRunning
});

export default connect(mapStateToProps)(Scene);