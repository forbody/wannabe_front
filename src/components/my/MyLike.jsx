import { Box, Button, ButtonGroup, Divider, Typography } from "@mui/material";
import { ForegroundBox } from "../styled_comp/StyledDiv";

const MyLike = () => {
    return (
        <ForegroundBox
        display='flex'
        style={{
            width:'100%',
            flexDirection:'column',
            justifyContent: 'space-between'
        }}
        >
            <Box
            display='flex'
            style={{
                width:'100%',
                justifyContent: 'space-around'
            }}
            >
                <span style={{fontWeight:'bold'}}>0</span>
                <span style={{fontWeight:'bold'}}>0</span>
            </Box>
            <ButtonGroup variant="text" size="large" aria-label="wannabe button group">
                <Button color="secondary" fullWidth>워너빙</Button>
                <Button color="secondary" fullWidth>워너버</Button>
            </ButtonGroup>
        </ForegroundBox>
    );
}

export default MyLike;