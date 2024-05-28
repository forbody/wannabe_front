import { Box, Button, Grid, TextField } from "@mui/material";
import { BackgroundBox, ForegroundBox } from "../components/styled_comp/StyledDiv";
import { useNavigate } from "react-router-dom";
import { todoApi } from "../api/services/TodoList";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const TodoShare = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const [comment, setComment] = useState();

    const onSetComments = (e) => {
        setComment(e.target.value);
    }

    const onShareList = async() => {
        try {
            const res1 = await todoApi.getList(localStorage.getItem('date'), loginUser);
            const listId = res1.payload?.id;
            console.log(res1.payload.share);
            if (res1.payload.share) { // 수정 버튼 누를때 comment id를 전달해줘야할듯?
                const ShareCommentId = res1.payload?.Share_comments[0].id
                const modify = await todoApi.modifyShareComment(ShareCommentId,{ comment } ,loginUser);
            } else {
                const res2 = await todoApi.uploadShareComment({
                    comment,
                    listId,
                }, loginUser);
                console.log(res2);
                if(res2.code==200) {
                    const res3 = await todoApi.modifyListShare(listId, loginUser);
                }
            }
            navigate(-1);
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{
                padding: "36px 0 80px",
                overflowY: "scroll",
                scrollbarWidth: "none",
            }}
        >
            <h1>TodoShare</h1>
            <BackgroundBox style={{ width: "90%" }}>
                <ForegroundBox
                    style={{
                        width: "335px",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "20px",
                    }}
                >
                    <Box>
                        <TextField
                            multiline
                            rows={6}
                            placeholder="추천 팁을 입력해 주세요"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => onSetComments(e)}
                        />
                    </Box>
                    <Grid container spacing={1} sx={{ marginTop: "10px" }}>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={() => onShareList()}
                            >
                                공유하기
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="warning"
                                fullWidth
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                돌아가기
                            </Button>
                        </Grid>
                    </Grid>
                </ForegroundBox>
            </BackgroundBox>
        </Box>
    );
}

export default TodoShare;