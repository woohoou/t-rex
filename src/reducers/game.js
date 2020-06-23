const gameReducer = (state = [], action) => {
  switch(action.type) {
    case 'START_GAME':
      return ({ ...state, playing: true })
    case 'STOP_GAME':
      return ({ ...state, playing: false })
    case 'INCREASE_LEVEL':
      return ({ ...state, level: action.level })
    case 'INCREASE_LEVEL_PROGRESS':
      return ({ ...state, level: action.levelProgress })
    default:
      return state;
  }
}

export default gameReducer;