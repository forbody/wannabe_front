import { Box, Typography, styled } from "@mui/material";
import { BackgroundBox } from "../components/styled_comp/StyledDiv";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ExerciseDetail from "../components/exercises/ExerciseDetail";
import ExerciseSelect from "../components/exercises/ExerciseSelect";
import ExerciseFollow from "../components/exercises/ExerciseFollow";
import TopButton from "../components/exercises/TopButton";
import { useAuth } from './../hooks/useAuth';
import Carousel from "react-material-ui-carousel";
import ExerciseModal from "../components/exercises/ExerciseModal";
import GetUserandRoleModel from "../components/user/GetUserandRoleModel";
import { exerciseApi } from "../api/services/exercise";
import StarsIcon from '@mui/icons-material/Stars';
import { zIndex } from '@mui/material/styles/zIndex'


const Exercise = () => {
    
    const token = localStorage.getItem("token");
    const sorts = [
        '#가슴',
        '#등',
        '#어깨',
        '#하체',
        '#전신',
    ];
    const { loginUser } = useAuth();
    const [refreshFav, setRefreshFav] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [randTip, setRandTip] = useState();
    const [favExercises, setFavExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState({});
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
    const [exerciseSortName, setExerciseSortName] = useState(sorts);
    // 태그 리스트  state

    const { modelImg, modelProfile } = GetUserandRoleModel();

    const scrollContainerRef = useRef(null);

    const getExercises = async () => {
        // 운동 리스트 조회 기능
        // 로그인했을때와  운동 목록 태그 리스트가  변경되면 다시 실행되도로록
        const data = exerciseSortName.map(e => e.slice(1))
        const res = await exerciseApi.getSortExercise(token, data);
        console.log(res.payload);
        setExercises(res.payload);
    }

    const getRandomTip = async () => {
        const res = await exerciseApi.getRandomTip(token);
        setRandTip(res.payload);
    }

    const getFavExercises = async() => {
        const res = await exerciseApi.getFavExercises(token);
        setFavExercises(res.payload);
    }

    useEffect(() => {
        getRandomTip();
    }, [loginUser]);

    useEffect(() => {
        getExercises();    
    }, [loginUser, exerciseSortName]);

    useEffect(() => {
        getFavExercises(); //
    }, [refreshFav]);
    // 해당 유저가 즐겨찾기한 운동 목록 조회
    
    return (
        <>
            <h1>운동</h1>
            <Box
                ref={scrollContainerRef}
                sx={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    justifyContent: "center",
                    alignContent: "flex-start",
                    position: 'relateve',
                }}
            >
                {/* 워너비가 말로 전해주는 느낌 */}
                
                {/* <BackgroundBox half> */}
                <Container>
                    {modelImg && (
                        <ImageBox>
                        <img
                            src={`http://localhost:8000/${modelImg}`}
                            alt={"img"}
                            style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                        />
                        </ImageBox>
                    )}
                </Container>
                {/* </BackgroundBox> */}
                {/* <BackgroundBox half> */}
                <Container>
                    <SpeechBubble>
                    <h3>{modelProfile?.user_name} 님의 건강을 위한 팁!!</h3> 
                    <p>-{randTip?.health_tip}</p>

                    </SpeechBubble>
                {/* </BackgroundBox> */}
                </Container>


                <BackgroundBox
                    display="flex"
                    style={{flexDirection:"column", alignItems:"stretch"}}
                >
                    <h3 style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
                    <StarsIcon style={{ color: '#ff7961', fontSize: 'inherit', marginRight: '10px' }} />
                    내가 즐겨찾기 한 운동
                    </h3>
                    <br />
                    <Carousel
                        showArrows={false}
                        autoPlay={false}
                        infiniteLoop={true}
                        showThumbs={false}
                        swipe={true}
                    >
                        {favExercises &&
                            favExercises.map((f) => (
                                <ExerciseFollow favExercise={f} />
                            ))}
                    </Carousel>
                </BackgroundBox>
                <BackgroundBox
                    display="flex"
                    style={{justifyContent:'center'}}
                >
                    <h3>운동 목록</h3>

                    {/* // 프롭스로 태그 리스트 전달 */}
                    <ExerciseSelect sorts={sorts} exerciseSortName={exerciseSortName} setExerciseSortName={setExerciseSortName} />
                </BackgroundBox>                
                <BackgroundBox display="flex"
                    style={{
                        justifyContent: 'center',
                        position: 'relative'
                }}>
                        {favExercises &&
                            exercises && exercises.map((exercise) => (
                                <ExerciseDetail
                                    key={exercise.id}
                                    exercise={exercise}
                                    favExercises={favExercises}
                                    refreshFav={refreshFav}
                                    setRefreshFav={setRefreshFav}
                                    onClick={() => {
                                        setIsExerciseModalOpen(true);
                                        setSelectedExercise(exercise)
                                    }}
                                />
                                
                            ))}
                        <ExerciseModal 
                            exercise={selectedExercise}
                            isOpen={isExerciseModalOpen}
                            onClose={() => {
                                setIsExerciseModalOpen(false);
                                setSelectedExercise({});
                            }}
                        />
                </BackgroundBox>
                <TopButton scrollContainerRef={scrollContainerRef} />
            </Box>
        </>
    );
}

const Container = styled(Box)(() => ({
    display: 'flex',
    objectFit: 'contain',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '20px',
    margin: '20px',
    width: '100%'
}));

const ImageBox = styled(Box)(() => ({
    width: '100%',
    height: '420px', 
    borderRadius: '5em',
    overflow: 'hidden',
    marginRight: '20px',
    flexShrink: 0,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.8)',
}));

const SpeechBubble = styled(Box)(() => ({
    position: 'relative',
    background: 'white',
    borderRadius: '2em',
    padding: '10px',
    marginLeft: '20px',
    flexGrow: 3,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', 
    '&:after': {
        content: "''",
        position: 'absolute',
        left: '20%',
        top: 0,
        width: 0 ,
        height: 0,
        border: '46px solid transparent',
        borderBottomColor: '#ffffff',
        borderRight: 0,
        borderTop: 0,
        marginTop: '-44px',
    }
}));
export default Exercise;