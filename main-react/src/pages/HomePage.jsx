import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutCollection from '../components/WorkoutCollection';

function HomePage({setExerciseToEdit}) {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([]);
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [orm, setORM] = useState(null);
    
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

    const calcOneRepMax = async() => {
        const weight_and_reps = {weight, reps};
        const response = await fetch('http://localhost:5000/api/orm', {method: "POST", headers: {'Content-type': 'application/json'}, body: JSON.stringify(weight_and_reps)});
        if(response.status === 200){
            const data = await response.json();
            console.log(data);
            setORM(data);
            // alert(`Projected 1RMX: ${orm.ORM}`)

        }else{
            alert("Not able to calculate, status code = " + response.status)
        }
    }

    useEffect(() => {
        if (orm) {
            alert(`One Rep Max calculated: ${orm.ORM}`);
        }
    }, [orm]); 


    return (
        <>
            <h2>My Journal</h2>
            <p><em>Review, edit and delete historic workouts below.</em></p>
            <p><em>Create new workouts or search historic ones using the links above!</em></p>
            <div>
                <table>
                    <caption>1RMX Calculator</caption>
                    <thead>
                        <tr>
                            <th>Weight</th>
                            <th>Reps</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
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
                                min = "0"
                                value={reps} 
                                onChange={e => setReps(e.target.value)}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            <button onClick={calcOneRepMax}>Calculate</button>
            </div>
            <WorkoutCollection workouts={workouts} onDelete={onDelete} onEdit={onEdit}></WorkoutCollection>
        </>
    );
};

export default HomePage;
