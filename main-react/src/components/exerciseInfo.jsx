function GetExerciseInfo({about_exercise}) {


    if (about_exercise) {
    
        return (   
            <div>
                <table>
                    <caption>About this Exercise</caption>
                    <thead>
                        <tr>
                            <th>General info</th>
                            <th>Target Muscles</th>
                            <th>Tips</th>
                            <th>Difficulty Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{about_exercise.general_info}</td>
                            <td>{about_exercise.target_muscle_group}</td>
                            <td>{about_exercise.safety_tips}</td>
                            <td>{about_exercise.difficulty_level}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    
    }

};

export default GetExerciseInfo;