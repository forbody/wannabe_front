import { Box, Grid, IconButton } from "@mui/material";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { useEffect, useState } from "react";
import { userApi } from "../../api/services/user";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { orange, red, cyan } from "@mui/material/colors";
import { useAuth } from "../../hooks/useAuth";
import { todoApi } from "../../api/services/TodoList";
import { useNavigate } from "react-router-dom";
import ShareEleBox from "./ShareEleBox";

const ShowTodoList = ({ e, setIsChange }) => {
    const navigate = useNavigate();
    const offset = new Date().getTimezoneOffset() * 60000;
    const currentDate = new Date(Date.now() - offset).toISOString().slice(0, 10);
    localStorage.setItem("date", currentDate);

    const { loginUser, logout, getUserInfoByToken } = useAuth();

    const [exercise, setExercise] = useState();
    const [breakfast, setBreakfast] = useState();
    const [lunch, setLunch] = useState();
    const [dinner, setDinner] = useState();
    const [userImg, setUserImg] = useState("");
    const [loginUserId, setLoginUserId] = useState();
    const [userProfile, setUserProfile] = useState(null);
    
    const getUploadUser = async () => {
        const userId = e.Users[0].id 
        const res = await userApi.getUser(userId, loginUser)
        setUserProfile(res.payload);
    }

    const uploadUserId = userProfile?.id;
    const getUserInfo = async () => {
        const up = await getUserInfoByToken();
        setLoginUserId(up.id);
    };
    const getTodoEle = async () => {
        try {
            const res = await todoApi.getEle(e.id, loginUser);
            const breakfast = res.payload.filter((e) => e.order == 1);
            const lunch = res.payload.filter((e) => e.order == 2);
            const dinner = res.payload.filter((e) => e.order == 3);
            const exercise = res.payload.filter((e) => e.order == 4);
            setExercise(exercise)
            setBreakfast(breakfast)
            setLunch(lunch)
            setDinner(dinner)
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
        getUserInfo()
        getUploadUser()
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
            <Grid container spacing={0} alignItems='center'>
                {userImg && (
                    <Grid item xs={2}>
                        <img
                            src={`http://localhost:8000/${userImg}`}
                            width="40"
                            alt={"img"}
                            style={{ borderRadius: "240px" }}
                        />
                    </Grid>
                )}
                <Grid item xs={7}>
                    {userProfile?.user_name}
                </Grid>

                {loginUserId === uploadUserId ? (
                    <>
                        <Grid item xs={1.5}>
                            <IconButton
                                sx={{ margin: "0", padding: "0" }}
                                onClick={() => onModifyComments()}
                            >
                                <EditIcon
                                    fontSize="small"
                                    sx={{ color: orange[400] }}
                                />
                            </IconButton>
                        </Grid>
                        <Grid item xs={1.5}>
                            <IconButton
                                sx={{ margin: "0", padding: "0" }}
                                onClick={() => onDeleteShare()}
                            >
                                <DeleteIcon
                                    fontSize="small"
                                    sx={{ color: red[400] }}
                                />
                            </IconButton>
                        </Grid>
                    </>
                ) : (
                    <Grid item xs={3}>
                        
                    </Grid>
                )}
            </Grid>
            {exercise?.length ? (
                <ShareEleBox elements={exercise}>운동</ShareEleBox>
            ) : (
                false
            )}
            {breakfast?.length ? (
                <ShareEleBox elements={breakfast}>아침</ShareEleBox>
            ) : (
                false
            )}
            {lunch?.length ? (
                <ShareEleBox elements={lunch}>점심</ShareEleBox>
            ) : (
                false
            )}
            {dinner?.length ? (
                <ShareEleBox elements={dinner}>저녁</ShareEleBox>
            ) : (
                false
            )}
            <ForegroundBox>
                {e.Share_comments[0]?.comment}
            </ForegroundBox>
        </ForegroundBox>
    );
};

export default ShowTodoList;