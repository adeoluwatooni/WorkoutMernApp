
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
  const {dispatch} = useAuthContext()
  const Logout = () => {

    // remove the user token from Local storage change it to null
    localStorage.removeItem('user')

    // use dispatch to fire logout action
    dispatch({type: 'LOGOUT'})
  }

  return { Logout }
}

export default useLogout;