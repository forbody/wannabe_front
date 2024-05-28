import { useAuth } from '../hooks/useAuth';
import { Box, Typography } from '@mui/material';
import { BackgroundBox } from '../components/styled_comp/StyledDiv';
import * as React from 'react';
import MyButtons from '../components/my/MyButtons';
import MyCalendar from '../components/my/MyCalendar';
import MyChart from '../components/my/MyChart';
import GetUserandRoleModel from '../components/user/GetUserandRoleModel';
import MyLikeBtn from '../components/my/MyLikeBtn';

const My = () => {
    const { loginUser, logout } = useAuth()
    const { userProfile, userImg } = GetUserandRoleModel();
    
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
            {userProfile?.user_name} 님의 페이지
            </Typography>
            <BackgroundBox style={{ justifyContent: 'center'}}>
                <MyLikeBtn />
            </BackgroundBox>
            <BackgroundBox style={{ justifyContent: 'center', marginTop:'24px'}}>
                <MyCalendar />
            </BackgroundBox>
            <BackgroundBox style={{ justifyContent: 'center', marginTop:'24px' }}>
                <MyChart />
            </BackgroundBox>
            <BackgroundBox style={{ justifyContent: 'center', marginTop:'24px' }}>
                <MyButtons loginUser={loginUser} logout={logout}/>
            </BackgroundBox>
        </Box>
    );
}

export default My;