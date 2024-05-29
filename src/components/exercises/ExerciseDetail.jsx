import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { IconButton, styled } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import StarsIcon from '@mui/icons-material/Stars';

const ExerciseDetail = ({exercise, favExercises, refreshFav, setRefreshFav, onClick }) => {

    const token = localStorage.getItem("token");
    const [match, setMatch] = useState();
    const [openDesc, setOpenDesc] = useState(false);
    
    useEffect(() => {
        setMatch(favExercises.some(f => f.id === exercise.id));
    }, [exercise, favExercises]);
    
    const handleOpenDesc = ()=> {
        setOpenDesc(!openDesc);
    }

    const addFavExercise = async(id) => {
        // axios.post(
        //     '/api',
        //     { name: name },
        //     { headers: { Authorization: token } }
        // )
        // axios post
        const res = await axios.post('http://localhost:8000/v1/exercise/favorite',
            { id }, {
            headers: { Authorization: token }
        });
        if(res.data.code === 200) {
            setRefreshFav(!refreshFav)
            setMatch(true);
        }
    }

    const delFavExercise = async(id) => {
        // axios.delete(
        //     'api',
        //     { headers: { Authorization: token }, data: { name: name } }
        // )
        const res = await axios.delete(
            'http://localhost:8000/v1/exercise/favorite',
            { headers: { Authorization: token }, data: { id } }
        )
        if(res.data.code === 200) {
            setRefreshFav(!refreshFav)
            setMatch(false);
        }
        console.log(res);
    }

    return ( 
        <div key={exercise.id} style={{ position: 'relative', width: '100%' }} >
            <h3>{exercise.name}</h3>

            { 
                match ?
                // 즐겨찾기 취소
                (<button 
                    onClick={()=>delFavExercise(exercise.id)} 
                    style={{cursor:'pointer', border: 'none', outline: 'none', border: 'none', background: 'none', padding: 0, margin: 0,position:'absolute', right: 0}}>
                    <StarsIcon style={{color:"green", fontSize:'36px'}}/></button>) 
                :
                // 즐겨찾기 추가
                (<button 
                    onClick={()=>addFavExercise(exercise.id)} 
                    style={{cursor:'pointer', border: 'none', outline: 'none', border: 'none', background: 'none', padding: 0, margin: 0,position:'absolute', right: 0}}>
                    <StarsIcon style={{color:"lightgray", fontSize:'36px'}} /></button>) 
            }
            <ExerImg src={'http://localhost:8000'+exercise.img} width='100%' onClick={onClick} style={{cursor:'pointer' }}/>
            
            {/* 수정(5.27) -- 상세 정보는 이미지 클릭했을 시 모달창 내에서 보일 수 있게끔 버튼 삭제 */}
            {/* <button onClick={handleOpenDesc}>상세정보</button> */}
            {/* {
                openDesc &&  <p>{exercise.description}</p>
            } */}
        </div>
    );
}

const ExerImg = styled(`img`)({
    '&:hover': {
        boxShadow: '0 0 3px 3px rgba(0, 0, 0, 0.3)'
    }
})


export default ExerciseDetail;