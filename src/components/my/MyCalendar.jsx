import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker } from '@mobiscroll/react';
import { ForegroundBox } from '../styled_comp/StyledDiv';

const MyCalendar = () => {
    return (
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
                theme="ios"
                themeVariant="dark"
            />
        </ForegroundBox>
    );
}

export default MyCalendar;