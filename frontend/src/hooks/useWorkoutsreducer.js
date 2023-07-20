import { WorkoutsContext } from "../context/workoutContext";
import { useContext } from "react";

const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext)

  if (!context) {
    throw Error('UseWorkoutsContext must be used in WorkoutsContextProvider')
  }
  return context
}