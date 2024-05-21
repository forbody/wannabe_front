import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, setOptions } from '@mobiscroll/react';
import { ForegroundBox } from '../styled_comp/StyledDiv';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { todoApi } from '../../api/services/TodoList';
import { useAuth } from '../../hooks/useAuth';

const MyCalendar = () => {
    const { loginUser }= useAuth();
    const today = new Date()
    const today_month = today.getMonth()+1;
    
    // 카테고리별 스테이트관리
    const [food, setFood] = useState([]);
    const [exercise, setExercise] = useState([]);
    /*
    // getTodo()함수 호출 
    useEffect(() => {
        getTodo();
    },[]) 

    
    ⚠️⚠️todoele 싹 쓸어오는 api 필요
    const getTodo = async () => {
        try {
            const res = await todoApi.getEle(listId, loginUser);
            res.payload.map((e) =>
                e.category_id == 1
                    ? setExercise((prev) => [...prev, { ...e }])
                    : setFood((prev) => [...prev, { ...e }])
            );
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    */

    return (
        <>
        <ForegroundBox
        display='flex'
        style={{
            width:'100%',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
        }}
        >
            <Typography
            variant='h6'
            fontWeight='600'
            >
                {today_month}월의 달성도
            </Typography>
            <Typography
            variant='h6'
            fontWeight='600'
            >
                38%
            </Typography>
        </ForegroundBox>
        <ForegroundBox
        display='flex'
        style={{
            width:'100%',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
        }}
        >
            <Datepicker
                controls={['calendar']}
                display="inline"
                touchUi={true}
            />
        </ForegroundBox>
        </>
    );
}

export default MyCalendar;