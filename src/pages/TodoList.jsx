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

const TodoList = () => {
    const navigate = useNavigate()

    const goTodoShareForm = () => {
        navigate('/todolist/share')
    }
    const goTodoForm =() => {
        navigate('/todolist/form')
    }

    const { loginUser }= useAuth();
    const [userProfile, setUserProfile] = useState();

    const getInfo = async () => {
        try {
            console.log("loginUser: ", loginUser);
            const userId = loginUser.id;
            console.log("userId: ", userId);
            const res = await userApi.getUser(`${userId}`);
            console.log("API Response: ", res);
            setUserProfile(res.data.payload);
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    
    useEffect(() => {
        if (loginUser) {
            getInfo();
        }
    }, [loginUser]);

    // 로그인 사용자 정보 조회 (유즈이펙트)
    // 1 생년월일과 성별이 널!
    //이프 ( 생년월일==널 || 성별 ===널 ) {
    //    리턴 (
    //        <사용자정보입력></사용자정보입력>
    //    )
    //}
    
    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Weekly />
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
                <TodoBox />
                <TodoBox />
            </BackgroundBox>
        </Box>
    );
}

export default TodoList;