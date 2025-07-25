import ExerciseItem from './ExerciseItem';

function WorkoutCollection({workouts, onDelete, onEdit}) {
    return (   
       <div className="collection-container">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Exercise</th>
                        <th>Weight</th>                       
                        <th>Reps</th>
                        <th>Unit</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map((exercise, i) => <ExerciseItem exercise={exercise} 
                        onDelete={onDelete} onEdit={onEdit} key={i}/>)}
                </tbody>
            </table>
        </div>

    );
}

export default WorkoutCollection;