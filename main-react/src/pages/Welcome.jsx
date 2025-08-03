import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

function Welcome() {
    const navigate = useNavigate();
    const Navigate = async () => {navigate('/home')};
    const [random_image, setImage] = useState([]);

    const loadImage = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/exercise-img'); 
            console.log('Content-Type:', response.headers.get('Content-Type'));
            const imageBlob = await response.blob();
            setImage(URL.createObjectURL(imageBlob));
        } catch (error) {
            console.log('Failed to load image:',error);
        }
    };

    useEffect(() => {loadImage();}, []);

    return (
        <div>
            <img src={random_image} alt="exercise"/>
            <p> Where training meets simplicity, IronForm offers powerlifters and bodybuilders a simple, 
                straightforward, and user-friendly way to track workouts, monitor progress, 
                and achieve goals. You focus on the lifts; we'll handle the logging.</p>
            <button className="EnterHere" onClick={Navigate} >Enter Here</button>
        </div>
    );
};

export default Welcome