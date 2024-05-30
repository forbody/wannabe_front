import { Box, Grid, IconButton, Typography } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { useAuth } from "../../hooks/useAuth";
import { todoApi } from "../../api/services/TodoList";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect, useState } from "react";
import { userApi } from "../../api/services/user";

const ShareEleBox = ({ children, elements  }) => {
    const token = localStorage.getItem("token");
    const [isTrue, setIsTrue] = useState(false);
    const { loginUser, getUserInfoByToken } = useAuth();
    const [totalCal, setTotalCal] = useState();
    const [order, setOrder] = useState();

    const [loginUserId, setLoginUserId] = useState();
    const [userProfile, setUserProfile] = useState(null);

    const getUserInfo = async () => {
        const up = await getUserInfoByToken();
        setLoginUserId(up.id);
    };

    const uniqueOrder = [...new Set(elements?.map((item) => item.order))];
    useEffect(() => {
        setTotalCal(elements.reduce((acc, e) => acc + e.Food[0]?.calory, 0));
        setOrder(...uniqueOrder);
    }, []);

    const onIsTrue = () => {
        setIsTrue(!isTrue);
    };
    useEffect(() => {
        getUserInfo();
    }, [loginUser]);


    const onSetRecommendFood = async () => {
        try {
            const date = localStorage.getItem("date");
            const res = await todoApi.createTodoList({ date }, token);
            const todo_list_id = res.payload?.id;
            const res2 = await todoApi.shareTodoEle(
                {
                    date: date,
                    todo_list_id: todo_list_id,
                    arr: elements,
                    order: order,
                },
                token
            );
        } catch (err) {
            console.error("Error: ", err);
        }
    };
    return (
        <ForegroundBox>
            <Grid container sx={{ alignItems: "center" }}>
                <Grid item xs={9} fontSize={20}>
                    {children}
                </Grid>
                {loginUserId === elements[0]?.UserId ? (
                    <Grid item xs={1.5}></Grid>
                ) : (
                    <Grid item xs={1.5}>
                        <IconButton
                            sx={{ margin: "0", padding: "0" }}
                            onClick={() => onSetRecommendFood()}
                        >
                            <FileUploadIcon
                                sx={{ color: cyan[400], fontSize: "30px" }}
                            />
                        </IconButton>
                    </Grid>
                )}
                <Grid item xs={1.5} onClick={() => onIsTrue()}>
                    <IconButton
                        sx={{ margin: "0", padding: "0", textAlign: "center" }}
                    >
                        {isTrue ? (
                            <ExpandLessIcon fontSize="large" />
                        ) : (
                            <ExpandMoreIcon fontSize="large" />
                        )}
                    </IconButton>
                </Grid>
                {isTrue &&
                    elements.map((e) =>
                        e.category_id == 1 ? (
                            <Grid container key={e.id} fontSize='14px'>
                                <Grid item xs={8}>
                                    {e.Exercises[0].name}
                                </Grid>
                                <Grid item xs={2}>
                                    {e.reps}회
                                </Grid>
                                <Grid item xs={2}>
                                    {e.sets}세트
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid
                                container
                                fontSize='14px'
                                key={e.id}
                            >
                                <Grid item xs={9}>
                                    {e.Food[0].name}
                                </Grid>
                                <Grid item xs={3}>
                                    {e.Food[0].calory}kcal
                                </Grid>
                            </Grid>
                        )
                    )}
                {isTrue && !isNaN(totalCal) && (
                    <Box
                        width="100%"
                        borderTop="1px solid black"
                        textAlign="right"
                    >
                        <Typography color="secondary">
                            {totalCal}kcal
                        </Typography>
                    </Box>
                )}
            </Grid>
        </ForegroundBox>
    );
};

export default ShareEleBox;