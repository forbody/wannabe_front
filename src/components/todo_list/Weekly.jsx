
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker } from '@mobiscroll/react';
import { BackgroundBox, ForegroundBox } from '../styled_comp/StyledDiv';
import ReactWeeklyDayPicker from "react-weekly-day-picker";
import './css/weeklyPicker.css'
import { Typography } from '@mui/material';




const Weekly = ({ setDate, setDay , date}) => {
    const classNames = {
        container: "",
        prevWeekArrow: "",
        nextWeekArrow: "",
        dayBox: "",
        dayCircleContainer: "",
        dayCicle: "",
        dayCircleTodayText: "",
        dayCircleUnavailable: "",
        dayCircleUnavailableText: "",
        dayCicleSelected: "",
    };
    const onselectDate = (date) => {
        const offset = new Date().getTimezoneOffset() * 60000;
        const temp = new Date(date - offset);
        const selectDate = temp.toISOString().slice(0, 10);
        setDate(selectDate);
        setDay(temp.getDay())
    };
    return (
        <>
            <BackgroundBox
                style={{
                    width: "90%",
                    justifyContent: "center",
                }}
            >
                <Typography variant='h5' sx={{fontWeight:'bold'}}>
                    {date.slice(5, 7)}월 {date.slice(8, 10)}일 일과
                </Typography>
                <ForegroundBox>
                    <Datepicker
                        display="inline"
                        calendarType="week"
                        calendarSize={1}
                        theme="ios"
                        themeVariant="light"
                        onCellClick={(e) => onselectDate(e.date)}
                    />
                </ForegroundBox>
            </BackgroundBox>
        </>
    );
};

export default Weekly;
