import { Box, Button, Typography } from "@mui/material";
import { BackgroundBox, ForegroundBox } from "../../components/styled_comp/StyledDiv";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
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
                        401 Unauthorized
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        재로그인이 필요합니다.
                    </Typography>
                    <Button variant="contained" fullWidth style={{marginTop:'12px'}} onClick={() => navigate('/login')}>로그인하기</Button>
                </ForegroundBox>
            </BackgroundBox>
        </Box>
    );
}

export default Error404;