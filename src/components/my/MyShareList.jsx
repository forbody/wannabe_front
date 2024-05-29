import { useEffect, useState } from "react";
import { todoApi } from "../../api/services/TodoList";
import { useAuth } from "../../hooks/useAuth";
import { BackgroundBox } from "../styled_comp/StyledDiv";
import ShowTodoList from "../wannabe/ShowTodoList";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyShareList = () => {
    const {loginUser} = useAuth()
    const [myShareList, setMyShareList] = useState();
    const [isChange, setIsChange] = useState();
    const navigate = useNavigate()

    const getMyShareList= async() => {
        try {
            const res= await todoApi.getMyShareList(loginUser)
            setMyShareList(res.payload)
            
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getMyShareList()
    },[])
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
            <BackgroundBox
                style={{justifyContent:'center'}}
            >
                {myShareList?.map((e) => (
                    <ShowTodoList e={e} key={e.id} setIsChange={setIsChange} />
                ))}
                <Box width='95%' marginTop="10px">
                    <Button color="secondary" variant="contained" fullWidth onClick={() => navigate('/my')}>
                        돌아가기
                    </Button>
                </Box>
            </BackgroundBox>
        </Box>
    );
}

export default MyShareList;