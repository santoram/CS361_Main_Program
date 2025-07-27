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
    };

    useEffect(() => {loadWorkouts();}, []);

//  onDelete and onEdit leveraged   
    const onDelete = async(_id) => {
        let result = confirm('Are you sure you want to remove this exercise?\nAll related information will be lost.');
        console.log(result);
        if (result == true){
            const response = await fetch(`./exercises/${_id}`, {method: 'DELETE'});
            if (response.status == 204) {
                alert(`Successfully deleted exercise with id: ${_id}`);
                setWorkouts(workouts.filter(e=> e._id !== _id));
            }else{
                alert(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
            };
        };
    };

    const onEdit = (exercise) =>{
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    };

    return (
        <>
            <h2>My Journal</h2>
            <p><em>Review, edit and delete historic workouts below.</em></p>
            <p><em>Create new workouts or search historic ones using the links above!</em></p>
            <WorkoutCollection workouts={workouts} onDelete={onDelete} onEdit={onEdit}></WorkoutCollection>
        </>
    );
};

export default HomePage;
