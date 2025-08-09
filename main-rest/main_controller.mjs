import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './main_model.mjs';
import cors from 'cors'; 
import fetch from 'node-fetch';

const app = express();

// Middlewear needed 
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await exercises.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});


const verifyDate = dateInfo => {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(dateInfo);
}


//----------------------------------------------------------------------------//


//create exercise
app.post('/exercises', asyncHandler(async (req, res)=>{

    try {
        const name = req.body.name;
        const reps = req.body.reps;
        const weight = req.body.weight;
        const unit = req.body.unit;
        const date = req.body.date;
        

        if (name != null && reps != null && weight != null 
            && unit != null && date != null){
                if (reps > 0 && weight >= 0){
                    if (unit  == 'kgs' || unit == "lbs"){
                        if (verifyDate(date)){
                            const exerciseCreate = await exercises.createExercise(name, reps, weight, unit, date);
                            res.status(201).send(exerciseCreate);
                        }else {
                            res.status(400).send({Error: "Invalid request"});
                            console.log('invalid date');
                        }
                    }else {
                        res.status(400).send({Error: "Invalid request"});
                    }
                }else {
                    res.status(400).send({Error: "Invalid request"});
                }
        }else{
            res.status(400).send({Error: "Invalid request"});
        }
    } catch (error) {
        res.status(400).send({Error: "Invalid request"});
    }
}))


//Retrieve all exercises
//get(retrieve/read) exercise by searching via query
app.get('/exercises', asyncHandler(async (req, res)=>{
    const name = req.query.name;
    const reps = req.query.reps;
    const weight = req.query.weight;
    const unit = req.query.unit;
    const date = req.query.date;

    const queryParameters = {}

    name? queryParameters['name'] = name: null;
    reps? queryParameters['reps'] = reps: null;
    weight? queryParameters['weight'] = weight: null;
    unit? queryParameters['unit'] = unit: null;
    date? queryParameters['date'] = date: null;

    if (name == undefined && reps == undefined && weight == undefined && unit == undefined && date == undefined){
        const getAllExercises = await exercises.findExercise({});
        res.send(getAllExercises)
    }else if (queryParameters){
        const getSpecificExercises = await exercises.findExercise(queryParameters);
        res.send(getSpecificExercises);
    }else{
        res.status(404).send({Error: "Not Found"});
    }
}))


//get (retrieve/read) exercise by id
app.get('/exercises/:id', asyncHandler(async (req, res)=>{
    const id = req.params.id;
    const exerciseFound = await exercises.findExercisebyID(id);
    if (exerciseFound != null){
        res.send(exerciseFound);
    }else{
        res.status(404).send({Error: "Not Found"});
    }
}))


//update exercise by id
app.put('/exercises/:id', asyncHandler(async (req, res)=>{
        
    try {
        const id = req.params.id;
        const name = req.body.name;
        const reps = req.body.reps;
        const weight = req.body.weight;
        const unit = req.body.unit;
        const date = req.body.date;

        const queryParameters = {}
        name? queryParameters['name'] = name: null;
        reps? queryParameters['reps'] = reps: null;
        weight? queryParameters['weight'] = weight: null;
        unit? queryParameters['unit'] = unit: null;
        date? queryParameters['date'] = date: null;

        if (name != null && reps != null && weight != null && unit != null && date != null){
                if (reps > 0 && weight > 0){
                    if (unit  == 'kgs' || unit == "lbs"){
                        if (verifyDate(date)){
                            const exerciseToUpdate = await exercises.findExercisebyID(id);
                            if (exerciseToUpdate != null){
                                const exerciseUpdated = await exercises.updateExercise(id, queryParameters);
                                res.status(200).send(exerciseUpdated);
                            }else {
                                res.status(404).send({Error: "Not Found"});
                            }
                        }else {
                            res.status(400).send({Error: "Invalid request"});
                        }
                    }else {
                        res.status(400).send({Error: "Invalid request"});
                    }
                }else {
                    res.status(400).send({Error: "Invalid request"});
                }
        }else{
            res.status(400).send({Error: "Invalid request"});
        }
   
    } catch (error) {
        res.status(400).send({Error: "Invalid request"});
    }
}))


//Delete users using query parameters
app.delete('/exercises', asyncHandler(async (req, res)=>{
    const name = req.query.name;
    const reps = req.query.reps;
    const weight = req.query.weight;
    const unit = req.query.unit;
    const date = req.query.date;

    const queryParameters = {}

    name? queryParameters['name'] = name: null;
    reps? queryParameters['reps'] = reps: null;
    weight? queryParameters['weight'] = weight: null;
    unit? queryParameters['unit'] = unit: null;
    date? queryParameters['date'] = date: null;

    const deletedExercise = await exercises.deleteExercise(queryParameters);
    deletedExercise > 0? res.status(200).send({"deletedCount": deletedExercise}): res.send({"deletedCount": 0});
}))

//Delete Exercise by ID
app.delete('/exercises/:id', asyncHandler(async (req, res)=>{
    const id = req.params.id;
    const deletedCount = await exercises.deleteById(id);
    deletedCount > 0? res.status(204).send(): res.status(404).send({Error: "Not Found"});
}))


//----------------------------------------------------------------------------//
//--------------------------------MICROSERVICE--------------------------------//
//----------------------------------------------------------------------------//

//get image
app.get('/api/exercise-img', async (req, res) => {
    const response = await fetch('http://127.0.0.1:8000/random-image');
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', response.headers.get('Content-Length'));
    console.log('Content-Type:', response.headers.get('Content-Type'));
    response.body.pipe(res); //stream the image directly to the client
});

//get quote
app.get('/api/quote', async (req, res) => {
    const response = await fetch('http://127.0.0.1:5007/quote');
    response.body.pipe(res);
});


//get 1rm
app.post('/api/orm', async (req, res) => {
    const weight = parseInt(req.body.weight);
    const reps = parseInt(req.body.reps);
    const response = await fetch(`http://127.0.0.1:5004/1rm?weight=${weight}&reps=${reps}`);
    response.body.pipe(res);
});


//get exercise recommendation
app.post('/api/exercise-recommend', async (req, res) => {
    const target = req.body.muscle_group;
    console.log(target);
    const response = await fetch(`http://127.0.0.1:5002/exercise-recommend?name=${target}`);
    console.log(response);
    response.body.pipe(res);
});


//get exercise information
app.get('/api/exercise-info', async (req, res) => {
    const response = await fetch(`http://127.0.0.1:5003/exercise-info?exercise=${exercise}`);
    response.body.pipe(res);
});
