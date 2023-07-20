
import { useState, useEffect } from 'react';

import 

import WorkoutDetails from './workoutDetails';
import WorkoutForm from '../components/workoutform';

const Home = () => {

  const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/workouts/')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Error fetching workouts')
        }
      })
      .then(data => {
        setWorkouts(data)
      })
      .catch(error => {
          console.error(error)
        })
  }, [])

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

