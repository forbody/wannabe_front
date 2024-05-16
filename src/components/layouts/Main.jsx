import { Grid, styled } from "@mui/material";
import BottomNavi from "./BottomNavi";

const Main = ({ children }) => {
    return (
        <Grid
                container
                width="375px"
                margin= "0 auto"
                direction="column"
                justify="center"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                wrap="nowrap"
                min-height="100vh"
                style={{
                    background: 'linear-gradient(135deg, #fdf00e, #33cc33)'
                }}
            >
                {children}
            <BottomNavi />
        </Grid>
    );
}

export default Main;
