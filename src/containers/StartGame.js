import React from 'react';
import { connect } from 'react-redux';
import { startGame, stopGame } from '../actions';

/**
 * Start game button
 */
const StartGame = ({ isPlaying, stopGame, startGame }) => {
  return (
    <button
      onClick={ isPlaying ? stopGame.bind(this) : startGame.bind(this) }
    >
      {isPlaying ? 'Stop Game' : 'Start Game'}
    </button>
  );
}

const mapStateToProps = state => ({
  isPlaying: state.game.isPlaying
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