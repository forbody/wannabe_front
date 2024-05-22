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
    const { loginUser, logout, getUserInfoByToken } = useAuth()

    // 유저 정보 가져오기
    const [userProfile, setUserProfile] = useState(null);
    const [userImg, setUserImg] = useState("");
    
    const getUserInfo = async() => {
        const up = await getUserInfoByToken();
        setUserProfile(up);
    }
    
    useEffect(() => {
        getUserInfo();
    }, [loginUser]);
    
    const [userBmiArray, setUserBmiArray] = useState([]);
    const [bmiDateArray, setBmiDateArray] = useState([]);
    
    useEffect(()=>{
        if (userProfile) {
            const ud = userProfile.UserDetail;
            const lastProfile = ud.length
            setUserImg(ud[lastProfile-1]?.img)
            for (let i=0; i<lastProfile; i++){
                if (ud[i]?.bmi !== undefined) {
                    setUserBmiArray([...userBmiArray, ud[i].bmi]);
                }
                if (ud[i]?.createdAt !== undefined) {
                    let fullDate = new Date(ud[i].createdAt);
                    let onlyDate = fullDate.getDate();
                    setBmiDateArray([...bmiDateArray, onlyDate])
                }
            }
        }
    }, [userProfile])
    
    

    if (userProfile === null) {
        return <div>Loading...</div>;
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