
import { useState, useEffect } from 'react';

import WorkoutDetails from './workoutDetails';

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
    </div>
  );
}

export default Home;

