import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import ExerciseModal from "../components/exercises/ExerciseModal";

const ExerciseDetail = ({exercise, favExercises, refreshFav, setRefreshFav }) => {
    const [match, setMatch] = useState();
    const { loginUser } = useAuth();
    const [openDesc, setOpenDesc] = useState(false);
    
    useEffect(() => {
        setMatch(favExercises.some(f => f.id === exercise.id));
    }, [exercise, favExercises]);
    
    const handleOpenDesc = ()=> {
        setOpenDesc(!openDesc);
    }
    console.log(match);

    const addFavExercise = async(id) => {
        // axios.post(
        //     '/api',
        //     { name: name },
        //     { headers: { Authorization: token } }
        // )
        // axios post
        const res = await axios.post('http://localhost:8000/v1/exercise/favorite',
            { id }, {
            headers: { Authorization: loginUser }
        });
        if(res.data.code === 200) {
            setRefreshFav(!refreshFav)
            setMatch(true);
        }
        console.log(res);
    }

    const delFavExercise = async(id) => {
        // axios.delete(
        //     'api',
        //     { headers: { Authorization: token }, data: { name: name } }
        // )
        const res = await axios.delete(
            'http://localhost:8000/v1/exercise/favorite',
            { headers: { Authorization: loginUser }, data: { id } }
        )
        if(res.data.code === 200) {
            setRefreshFav(!refreshFav)
            setMatch(false);
        }
        console.log(res);
    }

    return ( 
        <div key={exercise.id}>
            <h3>{exercise.name}</h3>
            { 
                match ?
                (<button onClick={()=>delFavExercise(exercise.id)}>즐겨찾기 cancel</button>) 
                :
                (<button onClick={()=>addFavExercise(exercise.id)}>즐겨찾기</button>) 
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