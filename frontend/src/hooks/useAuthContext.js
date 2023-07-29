
import { authcontext } from "../context/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(authcontext)

  if (!context) {
    throw Error('UseAuthcontext must be used in AuthContextProvider')
  }
  return context
}