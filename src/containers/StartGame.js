import React from 'react';
import { connect } from 'react-redux';
import { startGame, stopGame } from '../actions';

/**
 * Start game button
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