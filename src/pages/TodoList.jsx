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



const TodoList = () => {
    // 오늘 날짜 받아오기
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset).toISOString().slice(0, 10);
    // achieve 실시간 적용(test용)
    const [isAchieve, setIsAchieve] = useState(false);
    // 달력에서 클릭한 날짜 받아오기(첫 접속시 자동으로 오늘날짜 받아옴)
    const [date, setDate] = useState(today);

    // 카테고리별 스테이트관리
    const [food, setFood] = useState([]);
    const [exercise, setExercise] = useState([]);

    // getTodo()함수 호출 
    useEffect(() => {
        localStorage.setItem('date' , date)
        setExercise([]);
        setFood([]);
        getTodo()
    },[date, isAchieve]) 


    const getTodo = async () => {
        try {
            const res1 = await todoApi.getList(date);
            const listId = res1.payload?.id;
            const res2 = await todoApi.getEle(listId);
            res2.payload.map((e) =>
                e.category_id == 1
                    ? setExercise((prev) => [...prev, { ...e }])
                    : setFood((prev) => [...prev, { ...e }])
            );
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const cookies = new Cookies();
    if (cookies.get('accessToken') && cookies.get("userId")) {
        localStorage.setItem('token', cookies.get('accessToken'));
        localStorage.setItem('userId', cookies.get('userId'));
        cookies.remove('accessToken');
        cookies.remove('userId');
    }

    const navigate = useNavigate()

    const goTodoShareForm = () => {
        navigate('/todolist/share')
    }
    const goTodoForm =() => {
        navigate('/todolist/form')
    }

    const { loginUser }= useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const getInfo = async () => {
        try {
            const userId = loginUser.id;
            const res = await userApi.getUser(`${userId}`);
            setUserProfile(res.payload);
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    useEffect(() => {
            getInfo();
    }, []);

    if (userProfile === null) {
        return <div>Loading...</div>;
    } 

    /* 유저 프로필을 가져온 뒤 자동 화면 새로고침 ㅠㅠ 조건문이랑 use에펙 같이 사용 x 조건문안에 넣으면 무한 새로고침 아 어쩌란말이냐
    useEffect(() => {
        window.location.reload();
        }, [userProfile]);
    */

    return userProfile.birthday === null || userProfile.gender === null ? (
        <InfoUpdate />
    ) : (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Weekly setDate={setDate} />
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
                <TodoBox element={exercise} setIsAchieve={setIsAchieve}>운동</TodoBox>
                <TodoBox element={food} setIsAchieve={setIsAchieve}>식단</TodoBox>
            </BackgroundBox>
        </Box>
    );
}

export default TodoList;