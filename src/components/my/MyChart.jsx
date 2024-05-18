import { ForegroundBox } from "../styled_comp/StyledDiv";
import { LineChart } from '@mui/x-charts/LineChart';

const MyChart = () => {
    return (
        <ForegroundBox
        display='flex'
        style={{
            width:'100%',
        }}
        >
            <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
                {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
                },
            ]}
            width={250}
            height={200}
            />
        </ForegroundBox>
    );
}
export default MyChart;