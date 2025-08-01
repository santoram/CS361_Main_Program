import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

function Welcome() {
    const navigate = useNavigate();
    const Navigate = async () => {navigate('/home')};
    const [random_image, setImage] = useState([]);

    const loadImage = async () => {
        const response = await fetch('http://localhost:5555/random-image');
        const imagedata = await response.blob();
        setImage(URL.createObjectURL(imagedata));
    };

    useEffect(() => {loadImage();}, []);


    return (
        <div>
            <h3 className = "About">When training meets simplicity. </h3>
            <img src={random_image} alt="exercise"/>
            <h4> Finally. An app that offers powerlifters and bodybuilders a simple, 
                straightforward, and user-friendly way to track workouts, monitor progress, 
                and achieve goals. You focus on the lifts; we'll handle the logging.</h4>
            <button className="EnterHere" onClick={Navigate} >Enter Here</button>
        </div>
    );
};


export default Welcome