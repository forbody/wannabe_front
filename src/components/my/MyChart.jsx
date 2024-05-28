import { useEffect, useState } from 'react';
import { Button, Typography } from "@mui/material";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { LineChart } from '@mui/x-charts/LineChart';
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyChart = ({userProfile}) => {
    const navigate = useNavigate();
    const [userBmiArray, setUserBmiArray] = useState([]);
    const [bmiDateArray, setBmiDateArray] = useState([]);
    
    // bmi와 bmi 생성 날짜 가져오기
    useEffect(()=>{
        if (userProfile) {
            const ud = userProfile.UserDetail;
            const lastProfile = ud.length
            const updateBmiArr = []
            const updateDateArr = []
            for (let i=0; i<lastProfile; i++){
                if (ud[i]?.bmi) {
                    updateBmiArr.push(ud[i].bmi)
                }
                if (ud[i]?.createdAt) {
                    let fullDate = new Date(ud[i].createdAt);
                    let onlyDate = fullDate.getDate();
                    updateDateArr.push(onlyDate);
                }
            }
            setUserBmiArray(updateBmiArr);
            setBmiDateArray(updateDateArr);
        }
    }, [userProfile])

    // 아직 userProfile을 못 가져온 상태처리
    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <ForegroundBox
        display='flex'
        style={{
            width:'100%'
        }}
        >
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
            <LineChart
            xAxis={[{ data: bmiDateArray }]}
            series={[
                {
                data: userBmiArray,
                area: true,
                },
            ]}
            width={290}
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
export default MyChart;