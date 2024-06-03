import { useAuth } from '../hooks/useAuth';
import useUserandRoleModel from '../hooks/useUserandRoleModel';
import { Box, Typography } from '@mui/material';
import { BackgroundBox, PageBox } from '../components/styled_comp/StyledDiv';
import * as React from 'react';
import MyLikeBtn from '../components/my/MyLikeBtn';
import MyCalendar from '../components/my/MyCalendar';
import MyBmiChart from '../components/my/MyBmiChart';
import MyInfoButtons from '../components/my/MyInfoButtons';
import { display } from '@mui/system';

const My = () => {
    const { logout } = useAuth()
    const { userProfile, userImg } = useUserandRoleModel();
    
    // 아직 userProfile을 못 가져온 상태처리
    if (!userProfile) {
        return <div>Loading...</div>;
    }
    
    return (
        <PageBox>
            {userImg && (
                <img
                    src={`http://localhost:8000/${userImg}`}
                    width="200"
                    height="200"
                    alt={"img"}
                    style={{
                        borderRadius: "200px",
                        objectFit: "cover",
                        backgroundColor: "white"
                    }}
                />
            )}
            <Typography
                variant="h6"
                fontWeight="600"
                style={{
                    padding: "24px",
                }}
            >
                {userProfile?.user_name} 님의 페이지
            </Typography>
            <BackgroundBox style={{ justifyContent: "center" }}>
                <MyLikeBtn userProfile={userProfile} />
            </BackgroundBox>
            <BackgroundBox
                style={{ justifyContent: "center", marginTop: "10px" }}
            >
                <MyCalendar />
            </BackgroundBox>
            <BackgroundBox
                style={{ justifyContent: "center", marginTop: "10px" }}
            >
                <MyBmiChart userProfile={userProfile} />
            </BackgroundBox>
            <BackgroundBox
                style={{ justifyContent: "center", marginTop: "10px" }}
            >
                <MyInfoButtons logout={logout} />
            </BackgroundBox>
        </PageBox>
    );
}

export default My;