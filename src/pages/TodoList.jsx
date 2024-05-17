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
import { Cookies } from "react-cookie";

const TodoList = () => {
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

    return (
        userProfile.birthday === null || userProfile.gender === null ? (
            <InfoUpdate />
        ) : (
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
        )
    );
}

export default TodoList;