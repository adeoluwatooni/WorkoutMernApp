import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";

export const authcontext = createContext()

export const AuthContextProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(authReducer, {
    user : null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({type: 'LOGIN', payload: user})
    }
  }, [] )
  console.log('Auth context state : ', state)
  return (
    <authcontext.Provider value={{...state, dispatch}} >
      {children}
    </authcontext.Provider>
  )
}