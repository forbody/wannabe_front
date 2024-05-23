import { Box , IconButton } from "@mui/material";
import Weekly from "../components/todo_list/Weekly";
import { BackgroundBox } from "../components/styled_comp/StyledDiv";
import TodoBox from "../components/todo_list/TodoBox";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { useNavigate, useParams } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { cyan } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import InfoUpdate from "../components/signup/InfoUpdate";
import { userApi } from "../api/services/user";
import { todoApi } from "../api/services/TodoList";
import { Cookies } from "react-cookie";
import Swal from "sweetalert2";



const TodoList = () => {
    const { loginUser, kakaoLogin, getUserInfoByToken }= useAuth();
    // 오늘 날짜 받아오기
    const offset = new Date().getTimezoneOffset() * 60000;
    const currentDate = new Date(Date.now() - offset).toISOString().slice(0, 10);
    const currentDay =  new Date().getDay()
    // achieve 실시간 적용(test용)
    const [isAchieve, setIsAchieve] = useState(false);
    // 달력에서 클릭한 날짜 받아오기(첫 접속시 자동으로 오늘날짜 받아옴)
    const [date, setDate] = useState(currentDate);
    const [day, setDay] = useState(currentDay);

    // 카테고리별 스테이트관리
    const [food, setFood] = useState([]);
    const [exercise, setExercise] = useState([]);

    // getTodo()함수 호출 
    useEffect(() => {
        localStorage.setItem('date' , date)
        localStorage.setItem('day', day)
        setExercise([]);
        setFood([]);
        getTodo();
    },[date, isAchieve]) 


    const getTodo = async () => {
        try {
            const res1 = await todoApi.getList(date, loginUser);
            const listId = res1.payload?.id;
            const res2 = await todoApi.getEle(listId, loginUser);
            res2.payload.map((e) =>
                e.category_id == 1
                    ? setExercise((prev) => [...prev, { ...e }])
                    : setFood((prev) => [...prev, { ...e }])
            );
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const navigate = useNavigate()
    const goTodoShareForm = async () => {
        try {
            const res = await todoApi.getList(date, loginUser);
            if (!Boolean(res.payload?.Todo_elements)) {
                Swal.fire({
                    title: "일과를 등록해주세요.",
                    // text: "That thing is still around?",
                    icon: "error",
                });
            } else if (res.payload.share) {
                Swal.fire({
                    title: "이미 공유되었습니다.",
                    // text: "That thing is still around?",
                    icon: "info",
                });
            } else {
                navigate("/todolist/share");
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    const goTodoForm =() => {
        navigate('/todolist/form')
    }
    
    if (loginUser === null) {
        kakaoLogin();
    }

    // 카카오 로그인 유저 가운데 구유저/신유저 구분
    const [userProfile, setUserProfile] = useState(null);
    const getInfo = async () => {
        setUserProfile(getUserInfoByToken())
    }

    // getInfo() 함수 호출
    useEffect(() => {
        getInfo();
    }, [loginUser]);

    // 아직 userProfile을 못 가져온 상태처리
    if (userProfile === null) {
        return <div>Loading...</div>;
    } 

    // 카카오 신유저는 <InfoUpdate /> 컴포넌트 출력, 로컬 로그인 유저와 카카오 구유저는 <TodoList /> 페이지 출력
    return userProfile.birthday === null || userProfile.gender === null ? (
        <InfoUpdate />
    ) : (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Weekly setDate={setDate} setDay={setDay} />
            <BackgroundBox
                style={{
                    width: "90%",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <IconButton
                        sx={{ margin: "0", padding: "0" }}
                        onClick={() => goTodoShareForm()}
                    >
                        <FileUploadIcon
                            sx={{ color: cyan[400] }}
                            fontSize="large"
                        />
                    </IconButton>
                    <IconButton
                        sx={{ margin: "0", padding: "0" }}
                        onClick={() => goTodoForm()}
                    >
                        <AddBoxRoundedIcon color="secondary" fontSize="large" />
                    </IconButton>
                </Box>
                <TodoBox element={exercise} setIsAchieve={setIsAchieve}>
                    운동
                </TodoBox>
                <TodoBox element={food} setIsAchieve={setIsAchieve}>
                    식단
                </TodoBox>
            </BackgroundBox>
        </Box>
    );
}

export default TodoList;