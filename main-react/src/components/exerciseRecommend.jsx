function RecommendedExercises({target}) {
    const exercises = target.Exercises;
    console.log(target)
    // console.log(exercises)
    


    return (   
        <div>
            <h1>Recommended Exercises</h1>
            {exercises.map((exercise, index) => (<p key={index}>{exercise}</p> ))}
        </div>
    );
};

export default RecommendedExercises;