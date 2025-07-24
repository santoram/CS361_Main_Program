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
            alert("Successfully edited the exercise")
        }else{
            alert("Failed to edit the exercise, status code = " + response.status)
        }
        navigate('/')
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
                            <input 
                            type = "text" 
                            value={name} 
                            onChange={e => setName(e.target.value)}></input>
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
                                <option value="lbs">lbs</option>
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
}

export default EditExercisePage;