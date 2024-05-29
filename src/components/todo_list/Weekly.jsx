
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker } from '@mobiscroll/react';
import { BackgroundBox } from '../styled_comp/StyledDiv';
import ReactWeeklyDayPicker from "react-weekly-day-picker";
import './css/weeklyPicker.css'




const Weekly = ({ setDate, setDay }) => {
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
            <h1>TODO LIST</h1>
            <BackgroundBox
                style={{
                    width: "90%",
                    justifyContent: "center",
                }}
            >
                {/* <Datepicker
                    display="inline"
                    calendarType="week"
                    calendarSize={1}
                    theme="ios"
                    themeVariant="dark"
                    onCellClick={(e) => onselectDate(e.date)}
                /> */}
                <ReactWeeklyDayPicker
                    startDay={new Date()} // First day as Date Object or 22 June 2016
                    multipleDaySelect={false} //enables multiple day selection
                    daysCount={5}
                    beforeToday={true}
                    classNames={classNames}
                />
            </BackgroundBox>
        </>
    );
};

export default Weekly;
