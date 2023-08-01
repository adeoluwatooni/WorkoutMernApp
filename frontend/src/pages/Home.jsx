
// import { useState, useEffect } from 'react';

import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import WorkoutDetails from './workoutDetails';
import WorkoutForm from '../components/workoutform';

const Home = () => {
/* 
// a more straight forward way to update the ui when you ad or delete a workout is to add workouts to the dependency array to force a rerender after you alter the state of the workouts.

  const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/workouts/')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Could not fetch workouts')
        }
      })
      .then(data => {
        setWorkouts(data)
      })
      .catch(error => {
          console.error(error)
        })
  }, [workouts])
*/
  
  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts/', {
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])
  
  return (
    <div className='home'>
      <div className="workouts">
        {workouts && workouts.map(workout => (
            <WorkoutDetails key={workout._id} workout={workout} />
          )
        )}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;

