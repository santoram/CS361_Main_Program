import {useState} from 'react'
import { useNavigate } from "react-router-dom";

export const CreateWorkoutPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const addExercise = async () => {
            const newExercise = {name, reps, weight, unit, date}
            const response = await fetch('/exercises', {method: "POST", headers: {'Content-type': 'application/json'}, body: JSON.stringify(newExercise)});
            if(response.status === 201){
                alert("Successfully created exercise!")
            }else{
                alert("Failed to add exercise, status code = " + response.status)
            }
            navigate('/')
        };





    return (
        <div>
            <h1>Create Workout</h1>
            <p>How to add an Excercise</p>
            <ol>
                <li>Select an exercise</li>
                <li>Select weight type</li>
                <li>Select the metric</li>
                <li>Provide the weight, sets and reps</li>
                <li>Click <em>add exercise</em> once complete</li>
                <li>Repeat until finished logging</li>
            </ol>
            <p>Click <em>Submit Workout</em> to add it to your journal once you're finsihed adding exercises</p>
            
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
                            placeholder="Enter exercise" 
                            value={name} 
                            onChange={e => setName(e.target.value)}></input>
                        </td>
                        <td>
                            <input 
                            type = "number" 
                            placeholder="Enter reps" 
                            min = "1"
                            value={reps} 
                            onChange={e => setReps(e.target.value)}></input>
                        </td>
                        <td>
                            <input 
                            type = "number" 
                            placeholder="Enter weight" 
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
                            placeholder="Enter date (MM-DD-YY)" 
                            value={date} 
                            onChange={e => setDate(e.target.value)}></input>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addExercise}>Add</button>
        </div>
    );
}

export default CreateWorkoutPage;