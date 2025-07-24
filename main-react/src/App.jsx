import './App.css';
import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CreateWorkoutPage from './pages/CreateWorkout';
import ContactUs from './pages/ContactUs';
import EditExercise from './pages/EditExercise';



function App() {

    const [exerciseToEdit, setExerciseToEdit] = useState();

    return (
      <>
        <header className="title">
            <h1>IronForm</h1>
            <p><em>Track workouts. See progress. Crush PRs.</em></p>
        </header>

        <div className="app">
            <Router>
              <Navigation/>
              <Routes>
                <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
                <Route path="/create-workout" element={<CreateWorkoutPage/>}></Route>
                <Route path="/contact-us" element={<ContactUs/>}></Route>
                <Route path="/edit-exercise" element={ <EditExercise exerciseToEdit = {exerciseToEdit}/>}></Route>
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
