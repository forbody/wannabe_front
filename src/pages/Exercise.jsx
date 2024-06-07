import { Box, Typography, styled } from "@mui/material";
import { BackgroundBox, ForegroundBox, PageBox } from "../components/styled_comp/StyledDiv";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ExerciseDetail from "../components/exercises/ExerciseDetail";
import ExerciseSelect from "../components/exercises/ExerciseSelect";
import ExerciseFollow from "../components/exercises/ExerciseFollow";
import TopButton from "../components/layouts/TopButton";
import { useAuth } from './../hooks/useAuth';
import Carousel from "react-material-ui-carousel";
import ExerciseModal from "../components/exercises/ExerciseModal";
import useUserandRoleModel from "../hooks/useUserandRoleModel";
import { exerciseApi } from "../api/services/exercise";
import StarsIcon from '@mui/icons-material/Stars';
import { bgcolor, borderLeft, width } from "@mui/system";
import { PiX } from "react-icons/pi";


const Exercise = () => {
    
    const token = localStorage.getItem("token");
    const sorts = [
        '#가슴',
        '#등',
        '#어깨',
        '#하체',
        '#팔',
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
    const { modelImg, modelProfile } = useUserandRoleModel();

    

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
        <Box
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
                <Box
                    display="flex"
                    style={{
                        width: '100%',
                        height: '160px',
                        backgroundColor: '#ffffff',
                        borderLeft: '1px solid #eee',
                        borderRight: '1px solid #eee',
                        alignItems: 'center',
                        zIndex: 2,
                        justifyContent: 'center'
                    }}
                >
                {modelImg && (
                    <ImageBox>
                    <img
                        src={`http://localhost:8000/${modelImg}`}
                        alt={"img"}
                        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                    />
                    </ImageBox>
                )}
                </Box>
            {/* </BackgroundBox> */}
            {/* <BackgroundBox half> */}
            <Container>
                <SpeechBubble>
                <h3>{modelProfile?.user_name} 님의 건강을 위한 팁!!</h3> 
                <p>-{randTip?.health_tip}</p>
                </SpeechBubble>
            </Container>
            

            <BackgroundBox
                display="flex"
                style={{flexDirection:"column", alignItems:"stretch"}}
            >
                <h3 style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
                <StarsIcon style={{ color: '#ff7961', fontSize: 'inherit', marginRight: '10px' }} />
                내가 즐겨찾기한 운동
                </h3>
                <ForegroundBox style={{width:'100%'}}>
                    {favExercises && favExercises.length > 0 ? (
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
                    ) : (
                        <div style={{ textAlign: 'center', color: '#888' }}>
                            즐겨찾기한 항목이 없습니다.
                        </div>
                    )}
                </ForegroundBox>
            </BackgroundBox>

            <BackgroundBox
                display="flex"
                style={{
                    justifyContent:'center'
                }}
            >
                <Typography variant="h6" fontWeight="bold">운동 목록</Typography>
                    {/* // 프롭스로 태그 리스트 전달 */}
                    <ExerciseSelect sorts={sorts} exerciseSortName={exerciseSortName} setExerciseSortName={setExerciseSortName}/>
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
        </Box>
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
    width: '300px',
    height: '300px', 
    borderRadius: '100%',
    overflow: 'hidden',
    marginTop: '200px',
    flexShrink: 0,
    border: '16px solid #ffffff50',
    zIndex: 3
}));

const SpeechBubble = styled(Box)(() => ({
    position: 'relative',
    background: 'white',
    borderRadius: '2em',
    padding: '8px 16px',
    marginTop: '180px',
    flexGrow: 3,
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
        marginTop: '-36px',
    }
}));
export default Exercise;