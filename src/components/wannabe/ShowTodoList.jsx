import { Box, IconButton } from "@mui/material";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { useEffect, useState } from "react";
import { userApi } from "../../api/services/user";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { orange, red, cyan } from "@mui/material/colors";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useAuth } from "../../hooks/useAuth";
import { todoApi } from "../../api/services/TodoList";
import TodoBox from "../todo_list/TodoBox"
import { useNavigate } from "react-router-dom";

const ShowTodoList = ({ e, setIsChange }) => {
    const navigate = useNavigate();
    const offset = new Date().getTimezoneOffset() * 60000;
    const currentDate = new Date(Date.now() - offset)
        .toISOString()
        .slice(0, 10);
    localStorage.setItem("date", currentDate);

    const { loginUser, logout, getUserInfoByToken } = useAuth();

    const [userProfile, setUserProfile] = useState(null);
    const [userImg, setUserImg] = useState("");

    const [food, setFood] = useState([]);
    const [exercise, setExercise] = useState([]);
    const [arr, setArr] = useState();

    const userId = userProfile?.id;
    const uploadUserId = e.Users[0]?.id;
    const getUserInfo = async () => {
        const up = await getUserInfoByToken();
        setUserProfile(up);
    };
    const getTodoEle = async () => {
        try {
            const res = await todoApi.getEle(e.id, loginUser);
            res.payload.map((e) =>
                e.category_id == 1
                    ? setExercise((prev) => [...prev, { ...e.Exercises[0] }])
                    : setFood((prev) => [...prev, { ...e.Food[0] }])
            );
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    const onSetRecommendFood = async () => {
        try {
            let arr = [...food, ...exercise];
            const date = localStorage.getItem("date");
            const res = await todoApi.createTodoList({ date }, loginUser);
            const todo_list_id = res.payload?.id;
            const res2 = await todoApi.shareTodoEle(
                {
                    date,
                    todo_list_id,
                    arr,
                },
                loginUser
            );
            arr = [];
        } catch (err) {
            console.error("Error: ", err);
        }
    };
    const onModifyComments = () => {
        localStorage.setItem("date", e.date);
        navigate("/todolist/share");
    };
    const onDeleteShare = async () => {
        try {
            await todoApi.modifyListShare(e.id, loginUser);
            await todoApi.deleteShareComment(e.Share_comments[0]?.id, loginUser);
            setIsChange(prev => !prev)
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, [loginUser]);

    useEffect(() => {
        if (userProfile) {
            const ud = userProfile.UserDetail;
            const lastProfile = ud.length;
            setUserImg(ud[lastProfile - 1]?.img);
        }
    }, [userProfile]);

    useEffect(() => {
        getTodoEle();
    }, []);

    if (userProfile === null) {
        return <div>Loading...</div>;
    }
    return (
        <ForegroundBox
            style={{
                backgroundColor: "#ffffff99",
                width: "300px",
                flexDirection: "column",
                marginTop: "10px",
            }}
        >
            <Box>
                {userImg && (
                    <img
                        src={`http://localhost:8000/${userImg}`}
                        width="40"
                        alt={"img"}
                        style={{ borderRadius: "240px" }}
                    />
                )}
                {userProfile?.user_name}

                {userId === uploadUserId ? (
                    <>
                        <IconButton
                            sx={{ margin: "0", padding: "0" }}
                            onClick={() => onModifyComments()}
                        >
                            <EditIcon
                                fontSize="small"
                                sx={{ color: orange[400] }}
                            />
                        </IconButton>
                        <IconButton
                            sx={{ margin: "0", padding: "0" }}
                            onClick={() => onDeleteShare()}
                        >
                            <DeleteIcon
                                fontSize="small"
                                sx={{ color: red[400] }}
                            />
                        </IconButton>
                    </>
                ) : (
                    <IconButton
                        sx={{ margin: "0", padding: "0" }}
                        onClick={() => onSetRecommendFood()}
                    >
                        <FileUploadIcon
                            sx={{ color: cyan[400] }}
                            fontSize="small"
                        />
                    </IconButton>
                )}
            </Box>
            <Box
                sx={{
                    marginTop: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 0px 1px #888888dd",
                }}
            >
                elements들
            </Box>
            <Box
                sx={{
                    marginTop: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 0px 1px #888888dd",
                }}
            >
                {e.Share_comments[0]?.comment}
            </Box>
        </ForegroundBox>
    );
};

export default ShowTodoList;