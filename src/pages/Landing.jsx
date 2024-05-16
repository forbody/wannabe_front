import { Box, Divider, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button'
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { BackgroundBox, ForegroundBox } from '../components/styled_comp/StyledDiv';

const Landing = () => {
    const navigate = useNavigate()
    return ( 
        <>
            <Box
                height='100vh'
                display='flex'
                flexDirection='column'
                justifyContent='space-around'
                alignItems='center'
            >
                <Box>
                    <Typography variant='h2' fontWeight={800}>Wannabe</Typography>
                    <Typography>당신이 꿈꾸는 그대로, 워너비</Typography>
                </Box>
                <BackgroundBox
                display='flex'
                justifyContent='spaceAround'
                style={{
                    width:'80%',
                    padding:'32px'
                }}
                >
                    <Button
                    variant="contained"
                    color='white'
                    fullWidth
                    onClick={
                        () => navigate('/signup')
                    }
                    >
                    시작하기
                    </Button>
                    <Typography variant="caption" style={{ margin: '24px auto 0', color:'white'}}>간편 로그인</Typography>
                    <hr width='100%' color='white' style={{ margin: '0'}}/>
                    <Button
                        variant="contained"
                        fullWidth
                        style={{
                            marginTop:'16px',
                            backgroundColor:'#FAE100'
                        }}
                    >
                    <RiKakaoTalkFill 
                        style={{
                            position: 'relative',
                            right: '50px'
                        }}
                    />
                    카카오로 시작하기
                    </Button>
                </BackgroundBox>
                
            </Box>
        </>
    );
}

export default Landing;