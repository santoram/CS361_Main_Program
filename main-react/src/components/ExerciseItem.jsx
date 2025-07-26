import '../App.css';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

function ExerciseItem({exercise, onDelete, onEdit}) {


    return (
        <tr className="collection-item">
            <td>{exercise.date}</td>
            <td>{exercise.name}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.unit}</td>
            <td><div className="reactIcon"> <MdOutlineEdit onClick={e => {e.preventDefault(); onEdit(exercise)}}/></div></td>
            <td><div className="reactIcon"><FaRegTrashAlt onClick={e => {e.preventDefault(); onDelete(exercise._id)}}/></div></td>
        </tr>
    );
}

export default ExerciseItem;