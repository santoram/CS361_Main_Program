import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function ContactUs() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        alert(`Thank you for contacting us ${name}!`)
        navigate("/");
    }

    return (
        <>
            <h1>Contact Us</h1>
            <p><em>Have a question? Need help with something? have a suggestion to improve this app? Share it with us!</em></p>
            <form>
                <fieldset>
                    <legend>Your Details</legend>
                    <label>Please enter your email
                        <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                    </label>

                </fieldset>
                <button type="submit" onClick={submitHandler}>Submit</button>
            </form>
        </>
);
}

export default ContactUs;