import { Box, Typography } from "@mui/material";
import { BackgroundBox, ForegroundBox, PageBox } from "../components/styled_comp/StyledDiv";
import { useEffect, useState } from "react";
import FoodRecommend from "../components/food/FoodRecommend";
import Water from "../components/food/water";
import useUserandRoleModel from "../hooks/useUserandRoleModel";

const Food = () => {
    const { userProfile, modelProfile, modelImg } = useUserandRoleModel();
    const [meal, setMeal] = useState('');
    
    // 아침, 점심, 저녁 결정
    useEffect(() => {
        const today = new Date();
        const today_time = today.getHours();
        if (today_time >= 0 && today_time <= 10) {
            setMeal('아침');
        } else if (today_time >= 11 && today_time <= 15) {
            setMeal('점심');
        } else if (today_time >= 16 && today_time <= 23) {
            setMeal('저녁');
        }
        }, []);

    // 아직 userProfile, modelProfile을 못 가져온 상태처리
    if (!userProfile || !modelProfile) {
        return <div>Loading...</div>;
    }

    return ( 
        <PageBox>
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
                    {modelImg && <img src={ `http://localhost:8000/${modelImg}`} width='200' alt={"img"} style={{borderRadius:"100px"}} />}
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
                    marginTop:'10px',
                    flexDirection : 'column',
                    alignContent : 'center'
                }}
            >
                <Water />
            </BackgroundBox>
        </PageBox>
    );
}

export default Food;