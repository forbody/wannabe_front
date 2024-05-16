
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker } from '@mobiscroll/react';
import { BackgroundBox } from '../styled_comp/StyledDiv';
import { Button } from '@mui/material'


const onselectDate = (date) => {
    console.log(date);
}

const Weekly = () => {

    return (
        <>
            <h1>TODO LIST</h1>
            <BackgroundBox 
                style={{
                        width : '90%',
                        justifyContent : 'center'
                    }}
            >
                <Datepicker
                    display="inline"
                    calendarType="week"
                    calendarSize={1} 
                    theme='ios'
                    themeVariant='dark'
                    onCellClick={e => onselectDate(e.date)}/>
            </BackgroundBox>
        </>
    );
};

export default Weekly;
