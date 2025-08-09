function RecommendedExercises({target}) {
    const exercises = target.Exercises;
    console.log(target)
 


    return (   
        <div>
            <h4>Recommended Exercises</h4>
            {exercises.map((exercise, index) => (<p key={index}>{exercise}</p> ))}
        </div>
    );
};

export default RecommendedExercises;