import { Box, styled } from "@mui/material";
import { BackgroundBox } from "../components/styled_comp/StyledDiv";
import axios from "axios";
import { useEffect, useState } from "react";
import ExerciseDetail from "../components/exercises/ExerciseDetail";
import ExerciseSelect from "../components/exercises/ExerciseSelect";
import ExerciseFollow from "../components/exercises/ExerciseFollow";
import { useAuth } from './../hooks/useAuth';
import Carousel from "react-material-ui-carousel";
import ExerciseModal from "../components/exercises/ExerciseModal";
import GetUserandRoleModel from './../components/user/GetUserandRoleModel';


const Exercise = () => {
    const { loginUser } = useAuth();
    const [refreshFav, setRefreshFav] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [randTip, setRandTip] = useState();
    const [favExercises, setFavExercises] = useState([]);
    const { modelImg } = GetUserandRoleModel();

    const getExercises = async () => {
        const res = await axios.get('http://localhost:8000/v1/exercise');
        setExercises(res.data);
        console.log(res.data);
    }

    const getRandomTip = async () => {
        const res = await axios.get('http://localhost:8000/v1/health_tip');
        setRandTip(res.data);
    }

    const getFavExercises = async() => {
        const res = await axios.get('http://localhost:8000/v1/exercise/favorite',{
            headers: {
                Authorization: loginUser
            }
        }); 
        setFavExercises(res.data.payload);
    }

    useEffect(() => {
        getExercises();
        getRandomTip();
    }, []);
    useEffect(() => {
        getFavExercises(); //
    }, [refreshFav]);
    // 해당 유저가 즐겨찾기한 운동 목록 조회

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
                    {modelImg && <img src={ `http://localhost:8000/${modelImg}`} width='100' alt={"img"} style={{borderRadius:"100px"}} />}
                </BackgroundBox>
                <BackgroundBox half>
                    헬스 팁 - {randTip?.health_tip}
                    <ExerciseModal />
                </BackgroundBox>
                <BackgroundBox>
                    <h3>내가 즐겨찾기 한 운동</h3>
                    <br />
                    <Carousel 
                        showArrows={false}
                        autoPlay={false}
                        infiniteLoop={true}
                        showThumbs={false}
                        swipe={true}
                    >
                                {
                                    favExercises && favExercises.map(f => (
                                        <ExerciseFollow favExercise={f} />
                                    ))
                                }
                    </Carousel>
                </BackgroundBox>
                <BackgroundBox>
                    운동 목록
                    <ExerciseSelect />
                    
                </BackgroundBox>
                <BackgroundBox>
                    <>
                    {
                        favExercises && exercises.map(e => (
                            <ExerciseDetail key={e.id} exercise={e} favExercises={favExercises} refreshFav={refreshFav} setRefreshFav={setRefreshFav} /> //3 
                        ))
                    }
                    </>
                </BackgroundBox>
            </Box>
        </>
    );
}



export default Exercise;