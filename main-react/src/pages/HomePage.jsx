import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutCollection from '../components/WorkoutCollection';

function HomePage({setExerciseToEdit}) {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([]);
    
    const loadWorkouts = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setWorkouts(data);
    }

    useEffect(() => {
        loadWorkouts();
    }, []);



//  onDelete and onEdit leveraged   
    const onDelete = async(_id) => {
        const response = await fetch(`./exercises/${_id}`, {method: 'DELETE'});
        if (response.status == 204) {
            alert(`Successfully deleted exercise with id: ${_id}`);
            setWorkouts(workouts.filter(e=> e._id !== _id));
        }else{
            alert(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
    }

    const onEdit = (exercise) =>{
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    }


    return (
        <>
            <h2>My Workouts</h2>
            <p><em>Access your workouts or create new ones.</em></p>
            <p><em>Check PR's to monitor progress.</em></p>
            <p><em>Search an exercise to learn about it.</em></p>
            <WorkoutCollection workouts={workouts} onDelete={onDelete} onEdit={onEdit}></WorkoutCollection>
        </>
    );
}

export default HomePage;
