import { useEffect, useState } from "react";
import { todoApi } from "../api/services/TodoList";
import { BackgroundBox} from "../components/styled_comp/StyledDiv";
import { Box } from "@mui/material";
import ShowTodoList from "../components/wannabe/ShowTodoList";
import WannabeCard from "../components/wannabe/WannabeCard";

const Wannabe = () => {
    const [shareList, setShareList] = useState();

    const getShareList = async() => {
        try {
            const res = await todoApi.getShareList()
            setShareList(res.payload)
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    useEffect(() =>{
        getShareList()
    },[])

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
                    <ShowTodoList e={e}/>
                ))}
            </BackgroundBox>
        </Box>
    );
}

export default Wannabe;