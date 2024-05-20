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
    const { loginUser, logout } = useAuth()
    const [userProfile, setUserProfile] = useState(null);
    const getInfo = async () => {
        try {
            const userId = loginUser.id;
            const res = await userApi.getUser(`${userId}`, loginUser);
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

    const repeat = userProfile.UserDetail.length

    const userImg = userProfile.UserDetail[repeat-1]?.img

    let userBmiArray = [];
    let bmiDateArray = [];
    { for (let i=0; i<repeat; i++){
        if (userProfile.UserDetail[i]?.bmi !== undefined) {
            userBmiArray.push(userProfile.UserDetail[i].bmi);
            }
        if (userProfile.UserDetail[i]?.createdAt !== undefined) {
            let fullDate = new Date(userProfile.UserDetail[i].createdAt);
            let onlyDate = fullDate.getDate();
            bmiDateArray.push(onlyDate)
            }
        }
    }

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
            {userImg && <img src={ `http://localhost:8000/${userImg}`} width='200' alt={"img"} style={{borderRadius:"200px"}} />}
            <Typography
            variant='h6'
            fontWeight='600'
            style={{
                padding:'24px'
            }}
            >
            {userProfile.user_name}님의 페이지
            </Typography>
            <BackgroundBox style={{ justifyContent: 'center' }}>
                <MyCalendar />
            </BackgroundBox>
            <Typography
                variant='h6'
                fontWeight='600'
                style={{
                    padding:'24px'
                }}
                >
                    BMI 변화 추이
                </Typography>
            <BackgroundBox style={{ justifyContent: 'center' }}>
                <MyChart userBmiArray={userBmiArray} bmiDateArray={bmiDateArray}/>
            </BackgroundBox>
            <Typography
                variant='h6'
                fontWeight='600'
                style={{
                    padding:'24px'
                }}
                >
                    나의 정보 관리
                </Typography>
            <BackgroundBox>
                <MyButtons loginUser={loginUser} logout={logout}/>
            </BackgroundBox>
        </Box>
    );
}

export default My;