import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutCollection from '../components/WorkoutCollection';

export function SearchHistoricExercise ({setExerciseToEdit}) {
    let name = null;
    const [workouts, setWorkouts] = useState([]);
    const navigate = useNavigate();

    const searchHistoric = async () => {
        const response = await fetch(`/exercises?name=${name}`);
        const data = await response.json();
        setWorkouts(data);
        console.log(workouts);

    }

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
    }

    const onEdit = (exercise) =>{
        console.log("we made it here")
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    }


    return (
        <div>
            <h2>Search AnExercise</h2>
            <select name="Select name" onChange={e => name = e.target.value}>
                <option value="Back Extension" selected>Back Extension</option>
                <option value="Barbell Rows">Barbell Rows</option>
                <option value="Bench Press">Bench Press</option>
                <option value="Bent Rows">Bent Rows</option>       
                <option value="Bulgarian Split Squat">Bulgarian Split Squat</option>
                <option value="Calf Raise">Calf Raise</option>
                <option value="Chest Press">Chest Press</option>
                <option value="Chin Ups">Chin Ups</option>   
                <option value="Deadlift">Deadlift</option>
                <option value="Dips">Dips</option>
                <option value="Dumbbell Rows">Dumbbell Rows</option>
                <option value="Flyes">Flyes</option>       
                <option value="Good Morning">Good Morning</option>
                <option value="Hip Abduction">Hip Abduction</option>
                <option value="Hip Adduction">Hip Adduction</option>
                <option value="Kettlebell Swings">Kettlebell Swings</option>      
                <option value="Lat Pulldowns">Lat Pulldowns</option>
                <option value="Leg Curls">Leg Curls</option>
                <option value="Leg Extension">Leg Extension</option>
                <option value="Leg Press">Leg Press</option>       
                <option value="Lunge">Lunge</option>
                <option value="Overhead Press">Overhead Press</option>
                <option value="Pec Deck Machine">Pec Deck Machine</option>
                <option value="Pull-ups">Pull-ups</option>   
                <option value="Push Jerk">Push Jerk</option>
                <option value="Lunges">Lunges</option>
                <option value="Push Press">Push Press</option>
                <option value="Reverse Lunge">Reverse Lunge</option>       
                <option value="Snatch">Snatch</option>
                <option value="Squat">Squat</option>
                <option value="Sumo Deadlift High Pull">Sumo Deadlift High Pull</option>
            </select>
            <br></br>
            <button onClick={searchHistoric}>Search</button>
            <WorkoutCollection workouts={workouts} onDelete={onDelete} onEdit={onEdit}></WorkoutCollection>  
            
        </div>
    );
};

export default SearchHistoricExercise