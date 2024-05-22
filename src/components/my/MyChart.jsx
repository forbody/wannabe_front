import { Button, Typography } from "@mui/material";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { LineChart } from '@mui/x-charts/LineChart';
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const MyChart = ({ userProfile, userBmiArray, bmiDateArray }) => {
    const navigate = useNavigate();
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