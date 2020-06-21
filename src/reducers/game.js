const gameReducer = (state = [], action) => {
  switch(action.type) {
    case 'START_GAME':
      return ({ ...state, isRunning: true })
    case 'STOP_GAME':
      return ({ ...state, isRunning: false })
    default:
      return state;
  }
}

export default gameReducer;