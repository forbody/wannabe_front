import { Box, Typography } from "@mui/material";
import { BackgroundBox, ForegroundBox } from "../components/styled_comp/StyledDiv";
import { useEffect, useState } from "react";
import FoodRecommend from "../components/food/FoodRecommend";
import Water from "../components/food/water";
import GetUserandRoleModel from "../components/user/GetUserandRoleModel";

const Food = () => {
    const { userProfile, modelProfile, modelImg } = GetUserandRoleModel();

    const [meal, setMeal] = useState('');
    const [timeColor, setTimeColor] = useState('linear-gradient(135deg, #fdf00e, #33cc33)')
    
    // 아침, 점심, 저녁 결정
    useEffect(() => {
        const today = new Date();
        const today_time = today.getHours();
        if (today_time >= 0 && today_time <= 10) {
            setMeal('아침');
            setTimeColor('linear-gradient(135deg, #ff9b00, #fdf00e)');
        } else if (today_time >= 11 && today_time <= 15) {
            setMeal('점심');
            setTimeColor('linear-gradient(135deg, #fdf00e, #33cc33)');
        } else if (today_time >= 16 && today_time <= 23) {
            setMeal('저녁');
            setTimeColor('linear-gradient(135deg, #33cc33, #070070)');
        }
        }, []);

    if (userProfile === null) {
        return <div>Loading...</div>;
    }

    if (modelProfile === null) {
        return <div>Loading...</div>;
    }

    return ( 
        <Box
            width='100%'
            height='100%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            style={{
                padding:'36px 0 80px',
                overflowY: 'scroll',
                scrollbarWidth: 'none',
                background: timeColor
            }}
        >
            <BackgroundBox>
                <ForegroundBox
                    display='flex'
                    style={{
                        width:'100%',
                        alignItems:'center'
                    }}
                    >
                    <Typography
                        variant='h6'
                        fontWeight='600'
                        style={{
                            padding:'0 24px'
                        }}
                    >
                        {modelProfile.user_name} 님이 추천하는
                    </Typography>
                    <Typography
                        variant='h6'
                        fontWeight='600'
                        style={{
                            padding:'0 24px 24px'
                        }}
                        color='secondary'
                    >
                        {meal} 식단
                    </Typography>
                    {modelImg && <img src={ `http://localhost:8000/${modelImg}`} width='100' alt={"img"} style={{borderRadius:"100px"}} />}
                    <Typography
                    style={{
                        padding:'24px 0 0'
                    }}
                    >
                        "오늘도 화이팅이에요!"
                    </Typography>
                </ForegroundBox>
                <FoodRecommend meal={meal} />

            </BackgroundBox>
            <BackgroundBox
            style={{
                marginTop:'24px'
            }}
            >
                <Water />
            </BackgroundBox>
        </Box>
    );
}

export default Food;