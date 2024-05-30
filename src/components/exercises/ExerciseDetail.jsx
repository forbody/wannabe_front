import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { IconButton, Typography, styled } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import StarsIcon from '@mui/icons-material/Stars';
import { exerciseApi } from "../../api/services/exercise";
import { ForegroundBox } from "../styled_comp/StyledDiv";

const ExerciseDetail = ({exercise, favExercises, refreshFav, setRefreshFav, onClick }) => {

    const token = localStorage.getItem("token");
    const [match, setMatch] = useState();
    const [openDesc, setOpenDesc] = useState(false);

    const [favExercise, setFavExercise] = useState();
    const [delExercise, setDelExercise] = useState();
    
    useEffect(() => {
        setMatch(favExercises.some(f => f.id === exercise.id));
    }, [exercise, favExercises]);
    
    const handleOpenDesc = ()=> {
        setOpenDesc(!openDesc);
    }
    const addFavExercise = async (id) => {
        const res = await exerciseApi.postFavExercise(id, token);
        setFavExercise(res.payload);
        setRefreshFav(!refreshFav)
        setMatch(true);
    }
    // const addFavExercise = async(id) => {
    //     const res = await axios.post('http://localhost:8000/v1/exercise/favorite',
    //         { id }, {
    //         headers: { Authorization: token }
    //     });
    //     if(res.data.code === 200) {
    //         setRefreshFav(!refreshFav)
    //         setMatch(true);
    //     }
    // }
    const delFavExercise = async (id) => {
        const res = await exerciseApi.deleteFavExercise(token, {id});
        setDelExercise(res.payload);
        setRefreshFav(!refreshFav)
        setMatch(false);
    }
    // const delFavExercise = async(id) => {
    //     const res = await axios.delete(
    //         'http://localhost:8000/v1/exercise/favorite',
    //         { headers: { Authorization: token }, data: { id } }
    //     )
    //     if(res.data.code === 200) {
    //         setRefreshFav(!refreshFav)
    //         setMatch(false);
    //     }
    //     console.log(res);
    // }

    return ( 
        <ForegroundBox key={exercise.id} style={{ position: 'relative', width: '100%', marginTop:'10px' }} >
            <Typography variant="h6" style={{fontWeight:'bold'}}>{exercise.name}</Typography>

            { 
                match ?
                // 즐겨찾기 취소
                (<IconButton
                    onClick={()=>delFavExercise(exercise.id)} 
                    style={{cursor:'pointer', border: 'none', outline: 'none', border: 'none', background: 'none', padding: 0, margin: 0, position:'absolute', right: 10, top:10}}>
                    <StarsIcon style={{color:"#ff7961", fontSize:'36px'}}/></IconButton>) 
                :
                // 즐겨찾기 추가
                (<IconButton
                    onClick={()=>addFavExercise(exercise.id)} 
                    style={{cursor:'pointer', border: 'none', outline: 'none', border: 'none', background: 'none', padding: 0, margin: 0, position:'absolute', right: 10 , top:10}}>
                    <StarsIcon style={{color:"lightgray", fontSize:'36px'}} /></IconButton>) 
            }
            <ExerImg src={'http://localhost:8000'+exercise.img} width='100%' height='215px'  onClick={onClick} style={{cursor:'pointer' }}/>
            
            {/* 수정(5.27) -- 상세 정보는 이미지 클릭했을 시 모달창 내에서 보일 수 있게끔 버튼 삭제 */}
            {/* <button onClick={handleOpenDesc}>상세정보</button> */}
            {/* {
                openDesc &&  <p>{exercise.description}</p>
            } */}
        </ForegroundBox>
    );
}

const ExerImg = styled(`img`)({
    '&:hover': {
        boxShadow: '0 0 3px 3px rgba(0, 0, 0, 0.3)'
    }
})


export default ExerciseDetail;