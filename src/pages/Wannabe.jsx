import { useEffect, useState } from "react";
import { todoApi } from "../api/services/TodoList";
import { BackgroundBox, ForegroundBox } from "../components/styled_comp/StyledDiv";
import { Box } from "@mui/material";
import ShowTodoList from "../components/wannabe/ShowTodoList";

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
        <>
        <h1>워너비</h1>

        <BackgroundBox>
            {shareList?.map((e) => (
                <ShowTodoList e={e}/>
            ))}
        </BackgroundBox>
        </>
    );
}

export default Wannabe;