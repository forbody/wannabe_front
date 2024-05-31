import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { ForegroundBox } from '../styled_comp/StyledDiv';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { todoApi } from '../../api/services/TodoList';
import DayAchieve from './DayAchive';
import { width } from '@mui/system';

const MyCalendar = () => {
    const token = localStorage.getItem("token");
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset).toISOString().slice(0, 10);

    // achieve 실시간 적용(test용)
    const [value, setValue] = useState(dayjs(today));
    // 달력에서 클릭한 날짜 받아오기(첫 접속시 자동으로 오늘날짜 받아옴)
    const [date, setDate] = useState(today);
    // 달성도 관리
    const [dayGoal, setDayGoal] = useState();
    const [goal, setGoal] = useState();
    // 날짜별 달성도 저장
    const [goalsByDate, setGoalsByDate] = useState({});

    // getTodo()함수 호출 
    useEffect(() => {
        getTodo();
    },[date]) 

    useEffect(() => {
        fetchMonthlyGoals(dayjs(today));
    }, []);

    // 달성도 가져오기
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
                const dayGoal = parseInt((achieve / total) * 100);
                setDayGoal(dayGoal);
            } else {
                setDayGoal(0);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    // 달력용 달성도 가져오기
    const fetchMonthlyGoals = async (date) => {
        try {
            const startOfMonth = date.startOf('month');
            const endOfMonth = date.endOf('month');
            const daysInMonth = endOfMonth.date();
            const newGoalsByDate = {};

            for (let day = 1; day <= daysInMonth; day++) {
                const currentDate = startOfMonth.date(day).format('YYYY-MM-DD');
                const res1 = await todoApi.getList(currentDate, token);
                if (res1.payload) {
                    const listId = res1.payload?.id;
                    const res2 = await todoApi.getEle(listId, token);
                    const total = res2.payload?.length;
                    const achieve = res2.payload?.filter(
                        (e) => e.achieve === true
                    ).length;
                    const goal = parseInt((achieve / total) * 100);
                    newGoalsByDate[currentDate] = goal;
                } else {
                    newGoalsByDate[currentDate] = 0;
                }
            }
            setGoalsByDate(newGoalsByDate);
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // 날짜 형식에 맞춰 변경
    const onSetDate = (newValue) => {
        setValue(newValue)
        const YYYY = newValue.$y;
        const MM =
            newValue.$M + 1 >= 10 ? newValue.$M + 1 : `0${newValue.$M + 1}`;
        const DD = newValue.$D;
        setDate(`${YYYY}-${MM}-${DD}`);
        setGoal(goalsByDate[`${YYYY}-${MM}-${DD}`] || 0);
    }

    const handleMonthChange = (newDate) => {
        fetchMonthlyGoals(newDate);
    };
        
    function ServerDay(props) {
        const { day, outsideCurrentMonth, ...other } = props;
        const dateKey = day.format('YYYY-MM-DD');
        const goalForDay = goalsByDate[dateKey] || 0;
        const isSelected = goalForDay === 100;
    
    return (
        <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '💯' : undefined}
        >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
    }

    return (
        <>
            <DayAchieve date={date} goal={dayGoal}/>
            <ForegroundBox
                display="flex"
                style={{
                    width: "100%",
                    justifyContent: "center",
                    overflow: 'hidden'
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
                            width:"inherit"
                        }}
                        onMonthChange={handleMonthChange}
                        slots={{
                            day: ServerDay,
                        }}
                        slotProps={{
                            day: {
                                highlightedDays: Object.keys(goalsByDate).map(date => dayjs(date).date()),
                            },
                        }}
                        disableMargin='true'
                    />
                </LocalizationProvider>
            </ForegroundBox>
        </>
    );
}

export default MyCalendar;