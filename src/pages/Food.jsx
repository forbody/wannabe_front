import { Box, Typography } from "@mui/material";
import { BackgroundBox, ForegroundBox } from "../components/styled_comp/StyledDiv";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { userApi } from "../api/services/user";
import FoodRecommend from "../components/food/FoodRecommend";
import { PieChart } from "@mui/x-charts";

const Food = () => {
    const { loginUser, getUserInfoByToken } = useAuth()

    // 유저 정보 가져오기
    const [userProfile, setUserProfile] = useState(null);
    const getUserInfo = async() => {
        const up = await getUserInfoByToken();
        setUserProfile(up);
    }
    useEffect(() => {
        getUserInfo();
    }, [loginUser]);

    // 롤모델 정보 가져오기
    const [modelProfile, setModelProfile] = useState(null);
    const [modelImg, setModelImg] = useState("");
    const getModelInfo = async () => {
        try {
            const role_model = userProfile.role_model_id;
            const res = await userApi.getUser(`${role_model}`, loginUser);
            setModelProfile(res.payload);
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    useEffect(() => {
        getModelInfo();
    }, [userProfile]);

    useEffect(()=>{
        if (modelProfile) {
            const md = modelProfile.UserDetail;
            const lastProfile = md.length
            setModelImg(md[lastProfile-1]?.img)
        }
    }, [modelProfile])

    const [meal, setMeal] = useState('');
    const [timeColor, setTimeColor] = useState('linear-gradient(135deg, #fdf00e, #33cc33)')
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
            height='100vh'
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
                        {modelProfile.user_name}가 추천하는
                    </Typography>
                    <Typography
                        variant='h6'
                        fontWeight='600'
                        style={{
                            padding:'0 24px 24px'
                        }}
                        color='secondary'
                    >
                        {meal}식단
                    </Typography>
                    {modelImg && <img src={ `http://localhost:8000/${modelImg}`} width='100' alt={"img"} style={{borderRadius:"100px"}} />}
                    <Typography
                    style={{
                        padding:'24px 0 0'
                    }}
                    >"오늘도 화이팅이에요!"</Typography>
                </ForegroundBox>
                <FoodRecommend/>
            </BackgroundBox>
            <BackgroundBox
            style={{
                marginTop:'24px'
            }}
            >
                <ForegroundBox
                    display='flex'
                    style={{
                        width:'100%',
                        alignItems:'center'
                    }}
                    >
                    <PieChart
                    series={[
                        {
                        data: [
                            { id: 0, value: 10 },
                            { id: 1, value: 90, color:'#00000010'},
                        ],
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        cx: 140,
                        },
                    ]}
                    width={300}
                    height={200}
                    />
                    <Typography
                        variant='h6'
                        fontWeight='600'
                        style={{
                            padding:'0 24px'
                        }}
                    >
                        오늘 마신 물의 양
                    </Typography>
                </ForegroundBox>
            </BackgroundBox>
        </Box>
    );
}

export default Food;