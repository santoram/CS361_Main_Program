import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        alert(`Thank you for contacting us ${name}!`)
        navigate("/home");
    };

    return (
        <>
            <h2>Contact Us</h2>
            <p><em>Have a question? Need help with something? have a suggestion to improve this app? Share it with us!</em></p>
            <form>
                    <legend>Your Details</legend>
                    <div>
                        <label>    
                            <span>Please enter your name</span>
                            <input type="text" placeholder = "Your name" value={name} onChange={e => setName(e.target.value)}/>
                        </label>                    
                    </div>
                    <div>
                        <label>
                            <span>Please enter your email</span>
                            <input type="text"  placeholder = "Your email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </label>
                    </div>
                    <div>
                        <label className = "labelMessage">
                            <p>Please enter your message</p>
                            <input className = "contactMessage" type="text"  placeholder = "Your message" value={message} onChange={e => setMessage(e.target.value)}/>
                        </label>
                    </div>                    
                <button type="submit" onClick={submitHandler}>Submit</button>
            </form>
        </>
    );
};

export default ContactUs;