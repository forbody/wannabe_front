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
import GetUserandRoleModel from "../components/user/GetUserandRoleModel";
import { exerciseApi } from "../api/services/exercise";

const Exercise = () => {
    const token = localStorage.getItem("token");
    const { loginUser } = useAuth();
    const [refreshFav, setRefreshFav] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [randTip, setRandTip] = useState();
    const [favExercises, setFavExercises] = useState([]);
    const { modelImg } = GetUserandRoleModel();

    const getExercises = async () => {
        const res = await exerciseApi.getExercise(token);
        console.log(res.payload);
        setExercises(res.payload);
    }

    const getRandomTip = async () => {
        const res = await exerciseApi.getRandomTip(token);
        console.log(res.payload);
        setRandTip(res.payload);
    }

    const getFavExercises = async() => {
        const res = await exerciseApi.getFavExercises(token);
        setFavExercises(res.payload);
        console.log(res.payload);
    }

    useEffect(() => {
        getExercises();
        getRandomTip();
    }, [loginUser]);
    useEffect(() => {
        getFavExercises(); //
    }, [refreshFav]);
    // 해당 유저가 즐겨찾기한 운동 목록 조회

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
                    <h3>헬스 팁</h3> - {randTip?.health_tip}
                    <ExerciseModal />
                </BackgroundBox>
                <BackgroundBox
                    display="flex"
                    style={{flexDirection:"column", alignItems:"stretch"}}
                >
                    <h3>내가 즐겨찾기 한 운동</h3>
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
                    <ExerciseSelect />
                </BackgroundBox>
                <BackgroundBox>
                    <>
                        {favExercises &&
                            exercises && exercises.map((e) => (
                                <ExerciseDetail
                                    key={e.id}
                                    exercise={e}
                                    favExercises={favExercises}
                                    refreshFav={refreshFav}
                                    setRefreshFav={setRefreshFav}
                                /> //3
                            ))}
                    </>
                </BackgroundBox>
            </Box>
        </>
    );
}



export default Exercise;