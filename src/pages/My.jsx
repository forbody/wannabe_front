import { useAuth } from '../hooks/useAuth';
import { Box, Typography } from '@mui/material';
import { BackgroundBox } from '../components/styled_comp/StyledDiv';
import * as React from 'react';
import MyButtons from '../components/my/MyButtons';
import MyCalendar from '../components/my/MyCalendar';
import MyChart from '../components/my/MyChart';
import useUserandRoleModel from '../hooks/useUserandRoleModel';
import MyLikeBtn from '../components/my/MyLikeBtn';

const My = () => {
    const { logout } = useAuth()
    const { userProfile, userImg } = useUserandRoleModel();
    
    // 아직 userProfile을 못 가져온 상태처리
    if (!userProfile) {
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
            {userImg && <img src={ `http://localhost:8000/${userImg}`} width='200' height="200" alt={"img"} style={{borderRadius:"200px", objectFit : "cover"}} />}
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
                <MyLikeBtn userProfile={userProfile} />
            </BackgroundBox>
            <BackgroundBox style={{ justifyContent: 'center', marginTop:'10px'}}>
                <MyCalendar />
            </BackgroundBox>
            <BackgroundBox style={{ justifyContent: 'center', marginTop:'10px' }}>
                <MyChart userProfile={userProfile} />
            </BackgroundBox>
            <BackgroundBox style={{ justifyContent: 'center', marginTop:'10px' }}>
                <MyButtons logout={logout} />
            </BackgroundBox>
        </Box>
    );
}

export default My;