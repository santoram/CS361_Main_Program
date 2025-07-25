import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { IoInformationCircleOutline } from "react-icons/io5";


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
            navigate('/home')
        };

    return (
        <div>
            <h2>Create Workout</h2>
            <p className = 'createsteps'>How to add an Excercise</p>
            <ol>
                <li>Select an exercise <span className="tooltip"><IoInformationCircleOutline/><span className = "tooktiptext">Tooltip text</span></span></li>
                <li>Select weight type <span className="tooltip"><IoInformationCircleOutline/></span></li>
                <li>Select the metric <span className="tooltip"><IoInformationCircleOutline/></span></li>
                <li>Provide the weight, sets and reps <span className="tooltip"><IoInformationCircleOutline/></span></li>
                <li>Click <em>add exercise</em> once complete</li>
                <li>Repeat until finished logging</li>
            </ol>
            <p className = 'createsteps'>Click <em>Submit Workout</em> to add it to your journal once you're finsihed adding exercises</p>
            
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Exercise</th>
                        <th>Weight</th>
                        <th>Reps</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input 
                            type = "text" 
                            placeholder="Enter date (MM-DD-YY)" 
                            value={date} 
                            onChange={e => setDate(e.target.value)}></input>
                        </td>                        
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
                            placeholder="Enter weight" 
                            min = "0"
                            value={weight} 
                            onChange={e => setWeight(e.target.value)}></input>
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
                            <select name="Select unit" onChange={e => setUnit(e.target.value)}>
                                <option value="kgs">kgs</option>
                                <option value="lbs" selected>lbs</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addExercise}>Add</button>
        </div>
    );
}

export default CreateWorkoutPage;