import Button from '@mui/material/Button'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { BackgroundBox } from '../components/styled_comp/StyledDiv';

const My = () => {
    const { loginUser, login, logout } = useAuth()
    const navigate = useNavigate();
    return ( 
        <Box
                height='100vh'
                display='flex'
                flexDirection='column'
                alignItems='center'
                style={{
                    padding:'24px'
                }}
            >
                <Typography
                variant='h6'
                fontWeight='600'
                >
                마이 페이지
                </Typography>
            <BackgroundBox
                display='flex'
                style={{
                    width:'100%',
                    height: '90%',
                    padding:'100px'
                }}
                >
                    <Button variant="contained" color="white" onClick={() => logout( () => { navigate('/') } )}>로그아웃</Button>
                </BackgroundBox>
        </Box>
    );
}

export default My;