import { useState } from "react";

const ExerciseDetail = ({exercise}) => {
    const [openDesc, setOpenDesc] = useState(false);

    const handleOpenDesc = ()=> {
        setOpenDesc(!openDesc);
    }
    return ( 
        <div>
            <h3>{exercise.name}</h3>
            <button>즐겨찾기</button>
            <img src={'http://localhost:8000'+exercise.img} width='100%' />
            <button onClick={handleOpenDesc}>상세정보</button>
            {
                openDesc &&  <p>{exercise.description}</p>
            }
        </div>
    );
}

export default ExerciseDetail;