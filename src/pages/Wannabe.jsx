import { useEffect, useState } from "react";
import { todoApi } from "../api/services/TodoList";
import { BackgroundBox} from "../components/styled_comp/StyledDiv";
import { Box } from "@mui/material";
import ShowTodoList from "../components/wannabe/ShowTodoList";
import WannabeCard from "../components/wannabe/WannabeCard";
import { useAuth } from "../hooks/useAuth";

const Wannabe = () => {
    const { loginUser } = useAuth();
    const [shareList, setShareList] = useState();
    const [isChange, setIsChange] = useState(false);
    const getShareList = async() => {
        try {
            const res = await todoApi.getShareList(loginUser);
            setShareList(res.payload)
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    useEffect(() =>{
        getShareList()
    }, [isChange]);

    return ( 
        <Box
            height='100vh'
            display='flex'
            flexDirection='column'
            alignItems='center'
            style={{
                padding:'36px 0 80px',
                overflowY: 'scroll',
                scrollbarWidth: 'none'
            }}
        >
            <BackgroundBox>
                <WannabeCard/>
            </BackgroundBox>
            <BackgroundBox>
                {shareList?.map((e) => (
                    <ShowTodoList e={e} key={e.id} setIsChange={setIsChange} />
                ))}
            </BackgroundBox>
        </Box>
    );
}

export default Wannabe;
