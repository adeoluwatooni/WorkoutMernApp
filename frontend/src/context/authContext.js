import { createContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

export const authcontext = createContext()

export const AuthContextProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(authReducer, {
    user : null
  })

  console.log('Auth context state : ', state)
  return (
    <authcontext.Provider value={{...state, dispatch}} >
      {children}
    </authcontext.Provider>
  )
}