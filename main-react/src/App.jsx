import './App.css';
import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Welcome from './pages/Welcome'
import HomePage from './pages/HomePage';
import CreateWorkoutPage from './pages/CreateWorkout';
// import ContactUs from './pages/ContactUs';
import EditExercise from './pages/EditExercise';
import SearchHistoricExercise from './pages/SearchHistoric';
import image from './assets/logo.png';

function App() {

    const [exerciseToEdit, setExerciseToEdit] = useState();

    return (
      <>
        <header className="title">
            <img src={image} alt="Logo"/>
            <p><em>Track workouts. See progress. Crush PRs.</em></p>
        </header>

        <div className="app">
            <Router>
              <Routes>
                <Route path="/" element={<Welcome/>}></Route>                
                <Route path="/home" element={<><Navigation/><HomePage setExerciseToEdit={setExerciseToEdit}/></>}></Route>
                <Route path="/create-workout" element={<><Navigation/><CreateWorkoutPage/></>}></Route>
                <Route path="/search-historic" element={<><Navigation/><SearchHistoricExercise setExerciseToEdit={setExerciseToEdit}/></>}></Route>
                {/* <Route path="/contact-us" element={<><Navigation/><ContactUs/></>}></Route> */}
                <Route path="/edit-exercise" element={<><Navigation/><EditExercise exerciseToEdit = {exerciseToEdit}/></>}></Route>
              </Routes>
            </Router>
        </div>
        
        <footer>
                <p><em>&#169; 2025 Michael Santora</em></p>
        </footer>
      </>
  );
}

export default App;
