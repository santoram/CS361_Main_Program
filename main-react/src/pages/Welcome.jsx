import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();
    const Navigate = async () => {navigate('/home')};
    
    return (
        <div>
            <h3 className = "About">When training meets simplicity. </h3>
            <h4> Finally. An app that offers powerlifters and bodybuilders a simple, 
                straightforward, and user-friendly way to track workouts, monitor progress, 
                and achieve goals. You focus on the lifts; we'll handle the logging.</h4>
            <button className="EnterHere" onClick={Navigate} >Enter Here</button>
        </div>
    );
};


export default Welcome