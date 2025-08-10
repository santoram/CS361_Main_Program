function RecommendedExercises({target}) {
    let exercises = null;
    
    if(target){
        exercises = target.Exercises;
        return (   
        <div>
            <h2>Recommended Exercises</h2>
            {exercises.map((exercise, index) => (<p key={index}>{exercise}</p> ))}
        </div>
    );
    } 
};

export default RecommendedExercises;