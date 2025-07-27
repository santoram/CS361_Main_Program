import {Link} from 'react-router-dom'

function Navigation(){
    return (
        <nav className="app-nav">
            <Link to="/home">Home</Link>
            <Link to="/create-workout">Add Exercise</Link>         
            <Link to="/search-historic">Search Historic</Link> 
            {/* <Link to="/contact-us">Contact Us</Link> */}
        </nav>
    );
};

export default Navigation;