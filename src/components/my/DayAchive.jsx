import { Typography } from "@mui/material";
import { ForegroundBox } from "../styled_comp/StyledDiv";

const DayAchieve = ({date, goal}) => {

    return (
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
    );
}

export default DayAchieve;