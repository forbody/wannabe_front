import { useEffect, useState } from "react";
import { todoApi } from "../../api/services/TodoList";
import { BackgroundBox, ForegroundBox } from "../styled_comp/StyledDiv";
import ShowTodoList from "../wannabe/ShowTodoList";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyShareList = () => {
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
            console.error(err);
        }
    }

    useEffect(() => {
        getMyShareList()
    },[token])

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
            <BackgroundBox style={{ justifyContent: "center" }}>
                {console.log(myShareList)}
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
                            width: "300px",
                            flexDirection: "column",
                            marginTop: "5px",
                        }}
                    >
                        <Box textAlign="center" color='secondary'>공유된 일과가 없습니다.</Box>
                        <Box textAlign="center" color='secondary'>나의 일과를 공유해 주세요!</Box>
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
        </Box>
    );
}

export default MyShareList;