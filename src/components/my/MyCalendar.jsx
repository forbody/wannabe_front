import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ForegroundBox } from '../styled_comp/StyledDiv';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { todoApi } from '../../api/services/TodoList';
import { useAuth } from '../../hooks/useAuth';

const MyCalendar = () => {
    const { loginUser }= useAuth();
    const today1 = new Date()
    const today_month = today1.getMonth()+1;
    const today_date = today1.getDate();
    
    const offset = new Date().getTimezoneOffset() * 60000;
    const today2 = new Date(Date.now() - offset).toISOString().slice(0, 10);
    // achieve 실시간 적용(test용)
    const [isAchieve, setIsAchieve] = useState(false);
    // 달력에서 클릭한 날짜 받아오기(첫 접속시 자동으로 오늘날짜 받아옴)
    const [date, setDate] = useState(today2);

    // 카테고리별 스테이트관리
    const [food, setFood] = useState([]);
    const [exercise, setExercise] = useState([]);

    // getTodo()함수 호출 
    useEffect(() => {
        localStorage.setItem('date' , date)
        setExercise([]);
        setFood([]);
        getTodo();
    },[date, isAchieve]) 

    // getTodo()함수 호출 
    useEffect(() => {
        getTodo();
    },[]) 

    
    const getTodo = async () => {
        try {
            const res1 = await todoApi.getList(date, loginUser);
            const listId = res1.payload?.id;
            const res2 = await todoApi.getEle(listId, loginUser);
            res2.payload.map((e) =>
                e.category_id == 1
                    ? setExercise((prev) => [...prev, { ...e }])
                    : setFood((prev) => [...prev, { ...e }])
            );
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    let total = food?.length + exercise?.length ;
    let achieve = food?.filter((e) => e.achieve === true).length + exercise?.filter((e) => e.achieve === true).length;

    const goal = parseInt(achieve / total * 100);

    const [value, setValue] = useState(dayjs(today1));
        
    return (
        <>
        <ForegroundBox
        display='flex'
        style={{
            width:'100%',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems:'center'
        }}
        >
            <Typography
            variant='h6'
            fontWeight='600'
            >
                {today_month}월 {today_date}일의 달성도
            </Typography>
            <Typography
            variant='h6'
            fontWeight='600'
            color='secondary'
            >
                {goal} %
            </Typography>
        </ForegroundBox>
        <ForegroundBox
        display='flex'
        style={{
            width:'100%',
            justifyContent:'center'
        }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
                style={{
                    width:'260px',
                    height:'300px'
                }}
                />
            </LocalizationProvider>
            
        </ForegroundBox>
        </>
    );
}

export default MyCalendar;