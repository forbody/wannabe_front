import { Typography } from "@mui/material";
import { ForegroundBox } from "../styled_comp/StyledDiv";

const DayAchieve = ({goal}) => {
    const today1 = new Date()
    const today_month = today1.getMonth()+1;
    const today_date = today1.getDate();

    return (
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
                { goal ? goal : 0} %
            </Typography>
        </ForegroundBox>
    );
}

export default DayAchieve;