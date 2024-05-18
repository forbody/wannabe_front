import { useAuth } from '../hooks/useAuth';
import { Box, Typography } from '@mui/material';
import { BackgroundBox } from '../components/styled_comp/StyledDiv';
import { useEffect, useState } from 'react';
import { userApi } from "../api/services/user";
import * as React from 'react';
import MyButtons from '../components/my/MyButtons';
import MyCalendar from '../components/my/MyCalendar';
import MyChart from '../components/my/MyChart';

const My = () => {
    const { loginUser, login, logout } = useAuth()
    const [userProfile, setUserProfile] = useState(null);
    const getInfo = async () => {
        try {
            const userId = loginUser.id;
            const res = await userApi.getUser(`${userId}`);
            setUserProfile(res.payload);
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    useEffect(() => {
            getInfo();
    }, []);

    if (userProfile === null) {
        return <div>Loading...</div>;
    }

    const userImg = userProfile.UserDetail[0]?.img

    return ( 
        <Box
            height='100vh'
            display='flex'
            flexDirection='column'
            alignItems='center'
            style={{
                padding:'24px'
            }}
        >
            {userImg && <img src={ `http://localhost:8000/${userImg}`} width='240' alt={"img"} style={{borderRadius:"240px"}} />}
            <Typography
            variant='h6'
            fontWeight='600'
            style={{
                padding:'24px'
            }}
            >
            {userProfile.user_name}님의 페이지
            </Typography>
            <BackgroundBox>
                <MyButtons logout={logout}/>
            </BackgroundBox>
            <BackgroundBox>
                <MyCalendar />
            </BackgroundBox>
            <BackgroundBox>
                <MyChart />
            </BackgroundBox>
        </Box>
    );
}

export default My;