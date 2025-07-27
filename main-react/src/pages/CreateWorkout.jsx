import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { IoInformationCircleOutline } from "react-icons/io5";


export const CreateWorkoutPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('Back Extension');
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
            <h2>Add Exercise</h2>
            <p className = 'createsteps'>How to add an Excercise</p>
            <ol>
                <li>Enter Date <span className="tooltip"><IoInformationCircleOutline/><span className = "tooltiptext">Use MM-DD-YY</span></span></li>
                <li>Select an exercise <span className="tooltip"><IoInformationCircleOutline/><span className = "tooltiptext">Select movement from dropdown</span></span></li>
                <li>Select weight <span className="tooltip"><IoInformationCircleOutline/><span className = "tooltiptext">Enter the prescibed weight amount</span></span></li>
                <li>Select Reps  <span className="tooltip"><IoInformationCircleOutline/><span className = "tooltiptext">Enter how many times you performed the movement</span></span></li>
                <li>Unit <span className="tooltip"><IoInformationCircleOutline/><span className = "tooltiptext">Select lbs for pounds, kgs for kilograms</span></span></li>
                <li>Click <em>add exercise</em> once complete</li>
                <li>Repeat until finished logging!</li>
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
                            <select name="Select name" onChange={e => setName(e.target.value)}>
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
};

export default CreateWorkoutPage;