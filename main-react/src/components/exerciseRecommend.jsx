function RecommendedExercises({target}) {
    let exercises = null;
    
    if(target){
        exercises = target.Exercises;
        return (   
        <div>
            <h3>Recommended Exercises</h3>
            {exercises.map((exercise, index) => (<p key={index}>{exercise}</p> ))}
        </div>
    );
    } 
};

export default RecommendedExercises;