import { PieChart } from "@mui/x-charts";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { Button, Typography } from "@mui/material";

const Water = () => {
    return (
        <ForegroundBox
            display='flex'
            style={{
                width:'100%',
                alignContents:'center'
            }}
            >
            <Typography
            display='flex'
            variant='h6'
            fontWeight='600'
            style={{
                marginBottom:'8px',
                justifyContent:'center'
            }}
            >
                오늘 마신 물의 양
            </Typography>
            <PieChart
            series={[
                {
                data: [
                    { id: 0, value: 10, color:'#b3e3ff'},
                    { id: 1, value: 90, color:'#00000010'},
                ],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                cx: 130,
                },
            ]}
            width={300}
            height={200}
            />
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                style={{
                    marginTop:'8px'
                }}
            >물 마시기</Button>
        </ForegroundBox>
    );
}

export default Water;