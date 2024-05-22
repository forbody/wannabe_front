import { Box, Button, Grid, TextField } from "@mui/material";
import { BackgroundBox, ForegroundBox } from "../components/styled_comp/StyledDiv";
import { useNavigate } from "react-router-dom";
import { todoApi } from "../api/services/TodoList";
import { useState } from "react";

const TodoShare = () => {
    const navigate = useNavigate();
    const [comment, setComment] = useState();

    const onSetComments = (e) => {
        setComment(e.target.value);
    }

    const onShareList = async() => {
        // 백 수정해야할듯? findorcreate로하고 //없으면 만들고// 있으면 수정하는식으로..?
        try {
            const res1 = await todoApi.getList(localStorage.getItem('date'));
            const listId = res1.payload?.id;
            if (res1.payload.share) { // 수정 버튼 누를때 comment id를 전달해줘야할듯?
                const ShareCommentId = res1.payload?.Share_comments[0].id
                const modify = await todoApi.modifyShareComment(ShareCommentId,{ comment });
                console.log(modify);
            } else {
                const res2 = await todoApi.uploadShareComment({
                    comment,
                    listId,
                });
                console.log(res2);
                if(res2.code==200) {
                    const res3 = await todoApi.modifyListShare(listId);
                }
            }
            navigate("/todolist");
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
                            placeholder="추천 팁을 입력해주세요"
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
                                    navigate("/todolist");
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