import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ForegroundBox } from '../styled_comp/StyledDiv';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { todoApi } from '../../api/services/TodoList';

const MyCalendar = () => {
    const token = localStorage.getItem("token");
    
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset).toISOString().slice(0, 10);
    // achieve 실시간 적용(test용)
    // 달력에서 클릭한 날짜 받아오기(첫 접속시 자동으로 오늘날짜 받아옴)
    const [value, setValue] = useState(dayjs(today));
    const [date, setDate] = useState(today);
    // 카테고리별 스테이트관리
    const [elements, setElements] = useState();
    const [goal, setGoal] = useState();

    // getTodo()함수 호출 
    useEffect(() => {
        getTodo();
    },[date]) 

    const getTodo = async () => {
        try {
            const res1 = await todoApi.getList(date, token);
            if (res1.payload) {
                const listId = res1.payload?.id;
                const res2 = await todoApi.getEle(listId, token);
                const total = res2.payload?.length;
                const achieve = res2.payload?.filter(
                    (e) => e.achieve === true
                ).length;
                setGoal(parseInt((achieve  / total) * 100))            
            } else {
                setGoal(0)
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const onSetDate = (newValue) => {
        setValue(newValue)
        const YYYY = newValue.$y;
        const MM =
            newValue.$M + 1 >= 10 ? newValue.$M + 1 : `0${newValue.$M + 1}`;
        const DD = newValue.$D;
        setDate(`${YYYY}-${MM}-${DD}`);
    }

        
    return (
        <>
            <ForegroundBox
                display="flex"
                style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" fontWeight="600">
                    {date.slice(5, 7)}월 {date.slice(8, 10)}일의 달성도
                </Typography>
                <Typography variant="h6" fontWeight="600" color="secondary">
                    {goal ? goal : 0} %
                </Typography>
            </ForegroundBox>
            <ForegroundBox
                display="flex"
                style={{
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ko"
                >
                    <DateCalendar
                        value={value}
                        onChange={(newValue) => onSetDate(newValue)}
                        style={{
                            width: "260px",
                            height: "300px",
                        }}
                    />
                </LocalizationProvider>
            </ForegroundBox>
        </>
    );
}

export default MyCalendar;