import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { IoInformationCircleOutline } from "react-icons/io5";
import RecommendedExercises from '../components/exerciseRecommend';
import GetExerciseInfo from '../components/exerciseInfo';


export const CreateWorkoutPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('Back Extension');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');
    const [random_quote, setQuote] = useState([]);
    const [muscle_group, setMuscleGroup] = useState('');
    const [suggested_exercises, setSuggestedExercises] = useState('');
    const [exercise, setExercise] = useState('');
    const [info, setInfo] = useState('');


    const loadQuote = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/quote'); 
            const data = await response.json();
            console.log("Quote:", data.quote);
            setQuote(data);
        } catch (error) {
            console.log('Error fetching quote:',error);
        }
    };

    useEffect(() => {loadQuote();}, []);

    const findRecommendations = async () => {
        const muscle_target = {muscle_group};
        console.log(muscle_target)
        const response = await fetch('http://localhost:5000/api/exercise-recommend', {method: "POST", 
            headers: {'Content-type': 'application/json'}, body:JSON.stringify(muscle_target)});
        const recommendations = await response.json();
        console.log(recommendations.Exercises);
        setSuggestedExercises(recommendations);      
    };

    const getInfo = async () => {
        const exercise_req = {exercise};
        console.log(exercise_req)
        const response = await fetch('http://localhost:5000/api/exercise-info', {method: "POST", 
            headers: {'Content-type': 'application/json'}, body:JSON.stringify(exercise_req)});
        const info = await response.json();
        console.log(info)
        setInfo(info);      
    };


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

            <p><em>{random_quote.quote}</em></p>
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
            <p className = 'createsteps'>Click <em>Submit Workout</em> to add it to your journal once you're finished adding exercises</p>
            
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
            
            <br></br>
            <span>
                <table>
                    <caption>Need help picking an exercise?</caption>
                    <thead>
                        <tr>
                            <th>Select Muscle Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select name="Muscle Target" onChange={e => setMuscleGroup(e.target.value)}>
                                    <option value="Chest">Chest</option>
                                    <option value="Back">Back</option>
                                    <option value="Shoulders">Shoulders</option>
                                    <option value="Biceps">Biceps</option>
                                    <option value="Triceps">Triceps</option>
                                    <option value="Legs (Quads)">Legs (Quads)</option>
                                    <option value="Legs (Hamstrings)">Legs (Hamstrings)</option>
                                    <option value="Legs (Glutes)">Legs (Glutes)</option>
                                    <option value="Calves">Calves</option>
                                    <option value="Abs/Core">Abs/Core</option>
                                    <option value="Forearms">Forearms</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={findRecommendations}>Search</button> 
                <RecommendedExercises target={suggested_exercises}></RecommendedExercises>
            </span>

            <span>
                <table>
                    <caption>Exercise Info</caption>
                    <thead>
                        <tr>
                            <th>Select an Exercise to Learn More!</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select name="ExerciseInfo"  onChange={e => setExercise(e.target.value)}>
                                    <option value="Arnold Press">Arnold Press</option>
                                    <option value="Barbell Bench Press">Barbell Bench Press</option>
                                    <option value="Barbell Rows">Barbell Rows</option>
                                    <option value="Barbell Squats">Barbell Squats</option>
                                    <option value="Box Jumps">Box Jumps</option>
                                    <option value="Cable Flies">Cable Flies</option>
                                    <option value="Clean and Jerk">Clean and Jerk</option>
                                    <option value="Deadlift">Deadlift</option>
                                    <option value="Deficit Deadlifts">Deficit Deadlifts</option>
                                    <option value="Dips">Dips</option>
                                    <option value="Dumbbell Curls">Dumbbell Curls</option>
                                    <option value="Farmers Walk">Farmers Walk</option>
                                    <option value="Hammer Rows">Hammer Rows</option>
                                    <option value="Hang Cleans">Hang Cleans</option>
                                    <option value="Hang Snatch">Hang Snatch</option>
                                    <option value="Kettlebell Swings">Kettlebell Swings</option>
                                    <option value="Lat Pulldowns">Lat Pulldowns</option>
                                    <option value="Leg Extensions">Leg Extensions</option>
                                    <option value="Leg Press">Leg Press</option>
                                    <option value="Lying Leg Curls">Lying Leg Curls</option>
                                    <option value="Muscle Ups">Muscle Ups</option>
                                    <option value="Overhead Press (Barbell/Dumbbell)">Overhead Press (Barbell/Dumbbell)</option>
                                    <option value="Pendley Rows">Pendley Rows</option>
                                    <option value="Pistol Squat">Pistol Squat</option>
                                    <option value="Plank">Plank</option>
                                    <option value="Power Cleans">Power Cleans</option>
                                    <option value="Power Snatch">Power Snatch</option>
                                    <option value="Preacher Curls">Preacher Curls</option>
                                    <option value="Pull-ups">Pull-ups</option>
                                    <option value="Push Jerks">Push Jerks</option>
                                    <option value="Romanian Deadlifts">Romanian Deadlifts</option>
                                    <option value="Seated Calf Raises">Seated Calf Raises</option>
                                    <option value="Seated Leg Curls">Seated Leg Curls</option>   
                                    <option value="Shrugs">Shrugs</option>
                                    <option value="Snatches">Snatches</option>
                                    <option value="Split Squats">Split Squats</option>
                                    <option value="Sumo Deadlift">Sumo Deadlift</option>
                                    <option value="Sumo Deadlift High Pulls">Sumo Deadlift High Pulls</option>
                                    <option value="Triceps Pushdowns (Cable)">Triceps Pushdowns (Cable)</option>
                                    <option value="Weighted Burpees">Weighted Burpees</option>
                                    <option value="Weighted Lunges">Weighted Lunges</option>
                                    <option value="Weighted Push-ups">Weighted Push-ups</option>
                                    <option value="Zercher Squat">Zercher Squat</option>                                                                                                                                               
                                </select >
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={getInfo}>Explore</button>
                <GetExerciseInfo about_exercise={info}></GetExerciseInfo>
            </span>


        </div>
        

    );
};

export default CreateWorkoutPage;