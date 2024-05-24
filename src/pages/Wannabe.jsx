import { useEffect, useState } from "react";
import { todoApi } from "../api/services/TodoList";
import { BackgroundBox, ForegroundBox } from "../components/styled_comp/StyledDiv";
import { Box } from "@mui/material";
import ShowTodoList from "../components/wannabe/ShowTodoList";
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

    useEffect(() => {
        getShareList();
    }, [isChange]);
    return (
        <>
            <h1>워너비</h1>

            <BackgroundBox>
                {shareList?.map((e) => (
                    <ShowTodoList e={e} key={e.id} setIsChange={setIsChange} />
                ))}
            </BackgroundBox>
        </>
    );
}

export default Wannabe;