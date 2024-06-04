import { Box, Grid, IconButton, Typography } from "@mui/material";
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
import WannabeLikeBtn from "./WannabeLikeBtn";

const ShowTodoList = ({ e, setIsChange, liking, like, unlike }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const offset = new Date().getTimezoneOffset() * 60000;
    const currentDate = new Date(Date.now() - offset).toISOString().slice(0, 10);
    localStorage.setItem("date", currentDate);

    const { loginUser, logout, getUserInfoByToken, goToErrPage } = useAuth();

    const [exercise, setExercise] = useState();
    const [breakfast, setBreakfast] = useState();
    const [lunch, setLunch] = useState();
    const [dinner, setDinner] = useState();
    const [userImg, setUserImg] = useState("");
    const [loginUserId, setLoginUserId] = useState();
    const [userProfile, setUserProfile] = useState(null);

    const getUploadUser = async () => {
        const userId = e.Users[0].id 
        const res = await userApi.getUser(userId, token)
        setUserProfile(res.payload);
    }

    const uploadUserId = userProfile?.id;
    const getUserInfo = async () => {
        const up = await getUserInfoByToken();
        setLoginUserId(up.id);
    };
    const getTodoEle = async () => {
        try {
            const res = await todoApi.getEle(e.id, token);
            const breakfast = res.payload.filter((e) => e.order == 1);
            const lunch = res.payload.filter((e) => e.order == 2);
            const dinner = res.payload.filter((e) => e.order == 3);
            const exercise = res.payload.filter((e) => e.order == 4);
            setExercise(exercise)
            setBreakfast(breakfast)
            setLunch(lunch)
            setDinner(dinner)
        } catch (err) {
            goToErrPage(err, () => navigate('/err'));
        }
    };

    const onModifyComments = () => {
        localStorage.setItem("date", e.date);
        setIsChange(prev => !prev)
        navigate("/todolist/share");
    };
    const onDeleteShare = async () => {
        try {
            await todoApi.modifyListShare(e.id, token);
            await todoApi.deleteShareComment(e.Share_comments[0]?.id, token);
            setIsChange(prev => !prev)
        } catch (err) {
            goToErrPage(err, () => navigate('/err'));
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

    // 아직 loginUser, userProfile을 못 가져온 상태처리
    if (!loginUser || !userProfile ) {
        return <div>Loading...</div>;
    } 

    return (
        <ForegroundBox
            style={{
                backgroundColor: "#ffffff99",
                width: "100%",
                flexDirection: "column",
                marginTop: "5px",
            }}
        >
            <Grid container spacing={0} alignItems="center">
                {userImg && (
                    <Grid item xs={3}>
                        <img
                            src={`http://localhost:8000/${userImg}`}
                            width="60"
                            height="60"
                            alt={"img"}
                            style={{ borderRadius: "240px", objectFit:'cover', backgroundColor:'white' }}
                        />
                    </Grid>
                )}
                <Grid item xs={7}>
                    <Typography variant="h5">{userProfile?.user_name}</Typography>
                </Grid>

                {loginUserId === uploadUserId ? (
                    <>
                        <Grid item xs={1}>
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
                        <Grid item xs={1}>
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
                    <Grid item xs={2}>
                        {liking && uploadUserId && (
                            <WannabeLikeBtn
                                alreadyliked={liking}
                                like_id={uploadUserId}
                                like={like}
                                unlike={unlike}
                            />
                        )}
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
            <ForegroundBox>{e.Share_comments[0]?.comment}</ForegroundBox>
        </ForegroundBox>
    );
};

export default ShowTodoList;