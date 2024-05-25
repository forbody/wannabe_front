import { Box, Button, ButtonGroup, Divider, Typography } from "@mui/material";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { userApi } from "../../api/services/user";
import GetUserandRoleModel from "../user/GetUserandRoleModel";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const MyLike = () => {
    const { loginUser } = useAuth()
    const { userProfile } = GetUserandRoleModel();
    /*
    const [liker, setLiker] = useState();

    const getLikings = async () => {
        try{
            const res = await userApi.getLikers(`${userProfile?.id}`, loginUser)
            if (res.code === 200) {
                console.log('좋아하는 사람 가져오기 성공');
                setLiker(res.payload)
            } else {
                throw new Error(res.message);
            }
        }catch(err) {
            Swal.fire({
                title: "에러 발생",
                text: err.message,
                icon: "error"
            });
        }
    }

    useEffect(() => {
        getLikings();
    }, [loginUser, userProfile]);
    */

    // 아직 userProfile을 못 가져온 상태처리
    if (!userProfile) {
        return <div>Loading...</div>;
    } 

    return (
        <ForegroundBox
        display='flex'
        style={{
            width:'100%',
            flexDirection:'column',
            justifyContent: 'space-between'
        }}
        >
            <Box
            display='flex'
            style={{
                width:'100%',
                justifyContent: 'space-around'
            }}
            >
                <span style={{fontWeight:'bold'}}>0</span>
                <span style={{fontWeight:'bold'}}>0</span>
            </Box>
            <ButtonGroup variant="text" size="large" aria-label="wannabe button group">
                <Button color="secondary" fullWidth>워너빙</Button>
                <Button color="secondary" fullWidth>워너버</Button>
            </ButtonGroup>
        </ForegroundBox>
    );
}

export default MyLike;