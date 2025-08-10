function GetExerciseInfo({about_exercise}) {


    if (about_exercise) {
    
        return (   
            <div>
                <h2>About this Exercise</h2>
                <div className = "exerciseInfo">
                    <p>Difficulty Level: {about_exercise.difficulty_level}</p>
                    <p>General info: {about_exercise.general_info}</p>
                    <p>Target Muscle Groups: {about_exercise.target_muscle_group}</p>
                    <p>Safety Tips: {about_exercise.safety_tips}</p>
                </div>
            </div>
        );
    
    }

};

export default GetExerciseInfo;