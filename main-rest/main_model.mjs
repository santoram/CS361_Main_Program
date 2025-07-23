import mongoose from 'mongoose';
import 'dotenv/config';

const JOURNAL_DB_NAME = 'journal_db';
const EXERCISE_COLLECTION = 'exercises';
const EXERCISE_CLASS = 'exercise';

let connection = undefined;
let Exercise = undefined;


/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
            {dbName: JOURNAL_DB_NAME});
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        Exercise = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

function createModel(){
    //Define schema
    const userSchema = mongoose.Schema({
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, required: true},
        date: {type: String, required: true},
    }, {collection: EXERCISE_COLLECTION});
    return mongoose.model("EXERCISE_CLASS", userSchema);    
}


async function createExercise(name, reps, weight, unit, date){
    const exercise = new Exercise({name:name, reps:reps, weight:weight, unit:unit, date:date})
    return exercise.save();
}


const findExercise = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
} 

const findExercisebyID = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
} 

const updateExercise = async (id, update) => {
    const result = await Exercise.updateOne({_id: id}, {$set: update});
    const query =  Exercise.findById(id);
    return query.exec();
}

const deleteExercise = async(filter)=> {
    const result = await Exercise.deleteMany(filter);
    return result.deletedCount;
}

const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}



export {connect, createExercise, findExercise, findExercisebyID, updateExercise, deleteExercise, deleteById} ;