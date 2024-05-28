import { Grid } from "@mui/material";
import BottomNavi from "./BottomNavi";
import Header from "./Header";

const Main = ({ children }) => {
    return (
        <Grid
                container
                width="375px"
                margin= "0 auto"
                direction="column"
                justify="center"
                justifyContent='flex-start'
                alignItems="center"
                alignContent="center"
                wrap="nowrap"
                height="100vh"
                style={{
                    background: 'linear-gradient(135deg, #fdf00e, #33cc33)'
                }}
            >
            <Header/>
            {children}
            <BottomNavi />
        </Grid>
    );
}

export default Main;
