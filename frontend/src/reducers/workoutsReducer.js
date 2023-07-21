export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS': return {
      workouts: action.payload 
    }
    case 'CREATE_WORKOUT': return {
      workouts: [action.payload, ...state.workouts]
    }
    case 'DELETE_WORKOUT': return {
      workouts: state.workouts.filter((w) =>  w._id !== action.payload._id )
    }
    default:
      return state;
  }
}

// dispatch({type: 'CREATE_WORKOUT', payload: [{}]})