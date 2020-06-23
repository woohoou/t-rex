const gameReducer = (state = [], action) => {
  switch(action.type) {
    case 'START_GAME':
      return ({ ...state, playing: true })
    case 'STOP_GAME':
      return ({ ...state, playing: false })
    case 'SET_LEVEL':
      return ({ ...state, level: action.level })
    default:
      return state;
  }
}

export default gameReducer;