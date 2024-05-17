
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker } from '@mobiscroll/react';
import { BackgroundBox } from '../styled_comp/StyledDiv';
import { Button } from '@mui/material'




const Weekly = ({ setDate }) => {
    const onselectDate = (date) => {
        const offset = new Date().getTimezoneOffset() * 60000;
        const temp = new Date(date - offset);
        const selectDate = temp.toISOString().slice(0, 10);
        setDate(selectDate);
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
                <Datepicker
                    display="inline"
                    calendarType="week"
                    calendarSize={1}
                    theme="ios"
                    themeVariant="dark"
                    onCellClick={(e) => onselectDate(e.date)}
                />
            </BackgroundBox>
        </>
    );
};

export default Weekly;
