import { Box, styled } from "@mui/material";
import { BackgroundBox } from "../components/styled_comp/StyledDiv";
import axios from "axios";
import { useEffect, useState } from "react";
import ExerciseDetail from "../components/exercises/ExerciseDetail";
import ExerciseSelect from "../components/exercises/ExerciseSelect";
import ExerciseFollow from "../components/exercises/ExerciseFollow";

const Exercise = () => {
    const [exercises, setExercises] = useState([]);
    const [randTip, setRandTip] = useState();
    const getExercises = async () => {
        const res = await axios.get('http://localhost:8000/v1/exercise');
        setExercises(res.data);
        console.log(res.data);
    }

    const getRandomTip = async () => {
        const res = await axios.get('http://localhost:8000/v1/health_tip');
        setRandTip(res.data);
    }
    // 한번만 반복할 수 있게 만드는 함수
    useEffect(() => {
        getExercises();
        getRandomTip();
        getFavExercises(); // 2222  -> 주석 해제시 오류발생
    }, []);

    const [favExercises, setFavExercises] = useState([]);
    // 해당 유저가 즐겨찾기한 운동 목록 조회
    const getFavExercises = async() => {
        const res = await axios.get('http://localhost:8000/v1/exercise/favorite',{
            headers: {
                Authorization: accessToken
            }
        }); // 1111
        console.log(res);
        setFavExercises(res.data.payload);
    }

    return ( 
        <>
            <h1>운동</h1>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap',
                    overflowY: 'scroll',
                    scrollbarWidth: 'none',
                    justifyContent: 'center',
                    alignContent: 'flex-start'
                }}
            >
                <BackgroundBox half>
                    <h3 >
                    셀럽 이미지
                    </h3>
                </BackgroundBox>
                <BackgroundBox half>
                    헬스 팁 - {randTip?.health_tip}
                </BackgroundBox>
                <BackgroundBox>
                    내가 즐겨찾기 한 운동
                    {
                        favExercises.map(e => (
                            <ExerciseFollow />
                        ))
                    }
                </BackgroundBox>
                <BackgroundBox>
                    운동 목록
                    <ExerciseSelect />
                    
                </BackgroundBox>
                <BackgroundBox>
                    <>
                    {
                        exercises.map(e => (
                            <ExerciseDetail key={e.id} exercise={e} favExercises={favExercises} /> //3 
                        ))
                    }
                    </>
                </BackgroundBox>
            </Box>
        </>
    );
}



export default Exercise;