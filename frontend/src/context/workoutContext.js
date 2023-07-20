
import { createContext, useReducer } from "react";
import { workoutsReducer } from "../reducers/workoutsReducer";

export const WorkoutsContext = createContext()

const WorkoutsContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer( workoutsReducer, {workouts : null})

  return(
    <WorkoutsContext.Provider value={{...state, dispatch}}>
      { children }
    </WorkoutsContext.Provider>
  )
}

export default WorkoutsContextProvider  