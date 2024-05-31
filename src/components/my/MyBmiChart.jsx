import { useEffect, useState } from 'react';
import { Button, Typography } from "@mui/material";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { LineChart } from '@mui/x-charts/LineChart';
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

const MyBmiChart = ({userProfile}) => {
    const navigate = useNavigate();
    const [userBmiArray, setUserBmiArray] = useState([]);
    const [bmiDateArray, setBmiDateArray] = useState([]);
    
    // 오늘 날짜 받아오기
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = dayjs(new Date(Date.now() - offset));

    // 오늘 날짜의 월의 일(day)을 x축 데이터로 설정
    const getDaysInMonth = (date) => {
        const daysInMonth = [];
        const days = date.daysInMonth();
        for (let i = 1; i <= days; i++) {
            daysInMonth.push(i);
        }
        return daysInMonth;
    };
    
    // bmi와 bmi 생성 날짜 가져오기
    useEffect(()=>{
        if (userProfile) {
            const ud = userProfile.UserDetail;
            const updateBmiArr = [];
            const updateDateArr = getDaysInMonth(today);

            ud.forEach(detail => {
                if (detail?.bmi) {
                    updateBmiArr.push(detail.bmi);
                }
            });

            // userBmiArray에 값이 없으면 null 입력
            const filledBmiArray = updateDateArr.map(day => {
                const bmiDetail = ud.find(detail => dayjs(detail.createdAt).date() === day);
                return bmiDetail ? bmiDetail.bmi : null;
            });

            setUserBmiArray(filledBmiArray);
            setBmiDateArray(updateDateArr);
        }
    }, [userProfile]);

    // 아직 userProfile을 못 가져온 상태처리
    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Typography
        display='flex'
        variant='h6'
        fontWeight='600'
        style={{
            marginBottom:'8px',
            justifyContent:'center'
        }}
        >
            나의 BMI 변화
        </Typography>
        <ForegroundBox
        display='flex'
        style={{
            width:'100%'
        }}
        >
            <LineChart
            xAxis={[{ data: bmiDateArray }]}
            series={[
                {
                    data: userBmiArray,
                    connectNulls: true,
                    area: true,
                },
            ]}
            maxWidth={360}
            height={200}
            />
        </ForegroundBox>
        <ForegroundBox
            style={{
                width:'100%',
                height:'60px'
            }}
        >
        <Button variant="text" size="large" color="secondary" startIcon={<FaUserPlus/>} onClick={ () => navigate('/my/update') } fullWidth>신체 지수 변화 추가</Button>
        </ForegroundBox>
        </>
    );
}
export default MyBmiChart;