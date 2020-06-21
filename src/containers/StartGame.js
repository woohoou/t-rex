import React from 'react';
import { connect } from 'react-redux';
import { startGame, stopGame } from '../actions';

/*
class StartGame extends React.Component {
  render() {
    return (
      <button
        onClick={ e => this.props.isRunning ? this.props.dispatch(stopGame) : this.props.dispatch(startGame) }
      >
        {this.props.isRunning ? 'Stop Game' : 'Start Game'}
      </button>
    );
  }
}
*/

/**
 * Functional component
 */

const StartGame = ({ isRunning, stopGame, startGame }) => {
  return (
    <button
      onClick={ isRunning ? stopGame.bind(this) : startGame.bind(this) }
    >
      {isRunning ? 'Stop Game' : 'Start Game'}
    </button>
  );
}

const mapStateToProps = state => ({
  isRunning: state.game.isRunning
});

const mapDispatchToProps = dispatch => ({
  startGame: (e) => {
    document.activeElement.blur();
    dispatch(startGame());
  },
  stopGame: (e) => {
    document.activeElement.blur();
    dispatch(stopGame());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StartGame);