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
import useUserandRoleModel from "../hooks/useUserandRoleModel";
import { exerciseApi } from "../api/services/exercise";
import StarsIcon from '@mui/icons-material/Stars';

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

    const { modelImg } = useUserandRoleModel();

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
    
    // // 맨 위로 올리는


    return (
        <>
            <h1>운동</h1>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    justifyContent: "center",
                    alignContent: "flex-start",
                }}
            >
                <BackgroundBox half>
                    {modelImg && (
                        <img
                            src={`http://localhost:8000/${modelImg}`}
                            width="100%"
                            alt={"img"}
                            style={{ borderRadius: "20px" }}
                        />
                    )}
                </BackgroundBox>
                <BackgroundBox half>
                    
                    <h3>건강을 위한 팁!!</h3> - {randTip?.health_tip}
                </BackgroundBox>
                <BackgroundBox
                    display="flex"
                    style={{flexDirection:"column", alignItems:"stretch"}}
                >
                    <h3 style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
                    <StarsIcon style={{ color: 'green', fontSize: 'inherit', marginRight: '10px' }} />
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
                <BackgroundBox>
                    <>
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
                    </>
                </BackgroundBox>
            </Box>
        </>
    );
}





export default Exercise;