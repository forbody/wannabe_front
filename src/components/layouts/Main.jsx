import { Button, Grid, styled } from "@mui/material";
import BottomNavi from "./BottomNavi";
import { PiSparkleFill } from "react-icons/pi";

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
                height="100vh"
                style={{
                    background: 'linear-gradient(135deg, #fdf00e, #33cc33)'
                }}
            >
            <Button
            startIcon={<PiSparkleFill/>}
            style={{
                position:'relative',
                right:'120px',
                top:'8px',
                color:'#000',
                fontWeight:'800'
            }}
        >Wannabe</Button>
                {children}
            <BottomNavi />
        </Grid>
    );
}

export default Main;
