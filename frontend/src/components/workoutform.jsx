import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [reps, setReps] = useState(0)
  const [load, setLoad] = useState(0)

  const [error, setError] = useState(null)


  const handleSubmit = async (event) => {

    event.preventDefault()

    const newWorkout = { title, reps, load }

    const response = await fetch('http://localhost:4000/api/workouts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWorkout)
    })

    const data = await response.json()

    if (response.ok) {
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      console.log('new workout added:', data)
      dispatch({type:'CREATE_WORKOUT', payload:data })
    } else {
      setError(data.error)
    }

    /*
    fetch('http://localhost:4000/api/workouts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWorkout)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error posting new workout')
        } else {
          return response.json()
      }
      })
      .then((data) => {
        setError(null);
        setTitle('');
        setLoad(0);
        setReps(0);
        console.log('New Workout added:', data);
      })
      .catch((error) => {
        setError(error.message); 
        console.error(error);
      });
      */
  }
  
  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input 
        type="text" onChange={(e) => setTitle(e.target.value)} value={title}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" onChange={(e) => setLoad(e.target.value)} value={load}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" onChange={(e) => setReps(e.target.value)} value={reps} 
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>

  );
}

export default WorkoutForm;