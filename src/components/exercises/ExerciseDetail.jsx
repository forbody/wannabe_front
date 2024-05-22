import { useState, useEffect } from "react";
import axios from "axios";

const ExerciseDetail = ({exercise, favExercises}) => {
    const [openDesc, setOpenDesc] = useState(false);

    const handleOpenDesc = ()=> {
        setOpenDesc(!openDesc);
    }

    const addFavExercise = async(id) => { // 5
        // axios post
    }

    const delFavExercise = async(id) => { // 5
        // axios post 
    }

    return ( 
        <div key={exercise.id}>
            <h3>{exercise.name}</h3>
            {/* <button onClick={() => followExercise(exercise.id)}>즐겨찾기</button> */}
            { 
                favExercises.map(f => {
                    f.id === exercise.id ?
                        <button onClick={()=>delFavExercise(exercise.id)}>즐겨찾기 cancel</button> // 4
                        :
                        <button onClick={()=>addFavExercise(exercise.id)}>즐겨찾기</button> // 4
                })
            }
            
            <img src={'http://localhost:8000'+exercise.img} width='100%' />
            <button onClick={handleOpenDesc}>상세정보</button>
            {
                openDesc &&  <p>{exercise.description}</p>
            }
        </div>
    );
}

export default ExerciseDetail;