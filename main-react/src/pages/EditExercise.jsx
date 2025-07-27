import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ({exerciseToEdit}) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate()

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date}
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {method: "PUT", 
            headers: {'Content-type': 'application/json'}, body: JSON.stringify(editedExercise)}
        );
        if(response.status === 200){
            alert("Successfully edited exercise.")
        }else{
            alert("Failed to edit the exercise, status code = " + response.status)
        }
        navigate('/home')
    };

    return (
        <div>
            <h3>Edit Your Exercise Below</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select name="Select name" onChange={e => setName(e.target.value)}>
                                <option value="Back Extension">Back Extension</option>
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
                        </td>
                        <td>
                            <input 
                            type = "number" 
                            min = "1"
                            value={reps} 
                            onChange={e => setReps(e.target.value)}></input>
                        </td>
                        <td>
                            <input 
                            type = "number" 
                            min = "0"
                            value={weight} 
                            onChange={e => setWeight(e.target.value)}></input>
                        </td>
                        <td>
                            <select name="Select unit" onChange={e => setUnit(e.target.value)}>
                                <option value="kgs">kgs</option>
                                <option value="lbs" selected>lbs</option>
                            </select>
                        </td>
                        <td>
                            <input 
                            type = "text" 
                            value={date} 
                            onChange={e => setDate(e.target.value)}></input>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={editExercise}>Update</button>
        </div>
    );
};

export default EditExercisePage;