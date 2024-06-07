import { Box , Fab, IconButton } from "@mui/material";
import { BackgroundBox, PageBox } from "../components/styled_comp/StyledDiv";
import TodoBoxExercise from "../components/todo_list/TodoBoxExercise";
import TodoBoxFood from "../components/todo_list/TodoBoxFood"
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { useNavigate, useParams } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { blue, green } from "@mui/material/colors";
import { useEffect, useState, Suspense, lazy } from "react";
import { useAuth } from "../hooks/useAuth";
import InfoUpdate from "../components/signup/InfoUpdate";
import { todoApi } from "../api/services/TodoList";
import Swal from "sweetalert2";
import useUserandRoleModel from "../hooks/useUserandRoleModel";
import Loading from "../components/Loading";
import NavigationIcon from "@mui/icons-material/Navigation";
import Weekly from "../components/todo_list/Weekly";

const TodoList = () => {
    const token = localStorage.getItem("token");
    const { loginUser, kakaoLogin, goToErrPage }= useAuth();
    // 카카오 로그인 유저 가운데 구유저/신유저 구분
    const { userProfile } = useUserandRoleModel();

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

    const navigate = useNavigate();

    // getTodo()함수 호출 
    useEffect(() => {
        localStorage.setItem('date' , date)
        localStorage.setItem('day', day)
        getTodo();
        setExercise([])
        setFood([]);
    },[date]) 
    useEffect(() => {
        getTodo();
    },[isAchieve])
    // todolist 요청함수
    const getTodo = async () => {
        try {
            const res1 = await todoApi.getList(date, token);
            if (res1.payload) {
                const listId = res1.payload?.id;
                const res2 = await todoApi.getEle(listId, token);
                let fo = [];
                let ex = [];
                res2.payload.map((e) => {
                    e.category_id == 1 ? ex.push({...e}) : fo.push({...e});
                });
                setExercise(ex);
                setFood(fo);
            }
        } catch (err) {
            goToErrPage(err, () => navigate('/err'));
        }
    }

    // todolist 공유하기
    const goTodoShareForm = async () => {
        try {
            const res = await todoApi.getList(date, token);
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
            goToErrPage(err, () => navigate('/err'));
        }
    }
    const goTodoForm =() => {
        navigate('/todolist/form')
    }
    
    if (loginUser === null) {
        kakaoLogin();
    }

    if (!userProfile) {
        return <Loading />;
    }
    // 카카오 신유저는 <InfoUpdate /> 컴포넌트 출력, 로컬 로그인 유저와 카카오 구유저는 <TodoList /> 페이지 출력
    return userProfile?.birthday === null || userProfile?.gender === null ? (
        <InfoUpdate />
    ) : (
        <PageBox>
            <Weekly date={date} setDate={setDate} setDay={setDay} />
            <BackgroundBox
                style={{
                    width: "90%",
                    justifyContent: "center",
                    marginTop: "10px",
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
                            sx={{ color: blue[600] }}
                            fontSize="large"
                        />
                    </IconButton>
                    <IconButton
                        sx={{ margin: "0", padding: "0" }}
                        onClick={() => goTodoForm()}
                    >
                        <AddBoxRoundedIcon
                            sx={{ color: green[600] }}
                            fontSize="large"
                        />
                    </IconButton>
                </Box>
                <TodoBoxExercise element={exercise} setIsAchieve={setIsAchieve}>
                    운동
                </TodoBoxExercise>
                <TodoBoxFood element={food} setIsAchieve={setIsAchieve}>
                    식단
                </TodoBoxFood>
            </BackgroundBox>
        </PageBox>
    );
}

export default TodoList;