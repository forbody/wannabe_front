import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button'
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate()
    return ( 
        <>
            <Box
                height='100vh'
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
            >
                <Typography
                    variant='h2'
                    fontWeight={900}
                >
                Wannabe
                </Typography>
            
                <Typography
                    variant='h8'
                >
                당신이 꿈꾸는 그대로, 워너비
                </Typography>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        marginTop:'72px',
                        backgroundColor: 'white',
                        color: '#000000'
                    }}
                    onClick={
                        () => navigate('/login')
                    }
                >
                시작하기
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    style={{
                        marginTop:'24px',
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
            </Box>
            
        </>
    );
}

export default Landing;