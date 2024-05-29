import { Box, Button, Typography } from "@mui/material";
import { BackgroundBox, ForegroundBox } from "../../components/styled_comp/StyledDiv";
import { useNavigate } from "react-router-dom";

const Error500 = () => {
    const navigate = useNavigate()
    return (
        <Box
            width='90%'
            height='100vh'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            style={{
                padding:'0 0 60px',
                overflowY: 'scroll',
                scrollbarWidth: 'none'
            }}
        >
            <BackgroundBox style={{ justifyContent: 'center'}}>
                <ForegroundBox
                display='flex'
                style={{
                    width:'100%',
                    flexDirection:'column',
                    alignItems:'center'
                }}
                >
                    <Typography variant="h6" gutterBottom>
                        500 Internal Server Error
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        관리자에게 문의부탁드립니다.
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                        GitHub - @forbody
                    </Typography>
                    <Button variant="contained" fullWidth style={{marginTop:'12px'}} onClick={() => navigate(-1)}>뒤로가기</Button>
                </ForegroundBox>
            </BackgroundBox>
        </Box>
    );
}

export default Error500;