import { useEffect, useState } from "react";
import { todoApi } from "../../api/services/TodoList";
import { BackgroundBox, ForegroundBox, PageBox } from "../styled_comp/StyledDiv";
import ShowTodoList from "../wannabe/ShowTodoList";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const MyShareList = () => {
    const { goToErrPage } = useAuth();
    const token = localStorage.getItem("token");
    const [myShareList, setMyShareList] = useState();
    const [isChange, setIsChange] = useState();
    const navigate = useNavigate()

    const getMyShareList= async() => {
        try {
            const res = await todoApi.getMyShareList(token)
            if (res.code === 200) {
                setMyShareList(res.payload)
            } else {
                throw new Error(res.message);
            }
        }catch (err) {
            goToErrPage(err, () => navigate('/err'));
        }
    }

    useEffect(() => {
        getMyShareList()
    },[token, isChange])
    
    return (
        <PageBox justifyContent="center">
            <BackgroundBox style={{ justifyContent: "center" }}>
                {myShareList?.length ? (
                    myShareList.map((e) => (
                        <ShowTodoList
                            e={e}
                            key={e.id}
                            setIsChange={setIsChange}
                        />
                    ))
                ) : (
                    <ForegroundBox
                        style={{
                            backgroundColor: "#ffffff99",
                            width: "100%",
                            flexDirection: "column",
                            marginTop: "5px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            gutterBottom
                            textAlign="center"
                        >
                            공유된 일과가 없습니다.
                        </Typography>
                        <Typography variant="subtitle2" textAlign="center">
                            나의 일과를 공유해 주세요!
                        </Typography>
                    </ForegroundBox>
                )}
                <Box width="95%" marginTop="10px">
                    <Button
                        color="secondary"
                        variant="contained"
                        fullWidth
                        onClick={() => navigate("/my")}
                    >
                        돌아가기
                    </Button>
                </Box>
            </BackgroundBox>
        </PageBox>
    );
}

export default MyShareList;