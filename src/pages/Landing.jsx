import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button'
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { BackgroundBox } from '../components/styled_comp/StyledDiv';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import bg1 from '../assets/BGImage/bg1.jpeg'
import bg2 from '../assets/BGImage/bg2.jpeg'
import bg3 from '../assets/BGImage/bg3.jpeg'
import bg4 from '../assets/BGImage/bg4.jpeg'
import bg5 from '../assets/BGImage/bg5.jpeg'
import bg6 from '../assets/BGImage/bg6.jpeg'
import bg7 from '../assets/BGImage/bg7.jpeg'
import bg8 from '../assets/BGImage/bg8.jpeg'
import logo_white from '../assets/logo_white.png'


const Landing = () => {
    const navigate = useNavigate()
    const { loginUser, kakaoLogin } = useAuth();
    kakaoLogin();
    const {
        reset,
        formState: { errors },
    } = useForm();

    const bgImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];
    const [bgImg, setBgImg] = useState();

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * bgImages.length);
        setBgImg(bgImages[randomIndex]);
    },[])
    
    return ( 
        <Box
            width='100%'
            height='100vh'
            display='flex'
            flexDirection='column'
            justifyContent='space-around'
            alignItems='center'
            sx = {{
                backgroundImage: `url(${bgImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            <Box
                display='flex'
                flexDirection='column'
                alignItems='flex-end'
            >
                <img src={logo_white} alt="logo" width="60px" />
                <Typography variant='h2' fontWeight={800} color='primary'>Wannabe</Typography>
                <Typography color='#fff'>당신이 꿈꾸는 그대로, 워너비</Typography>
            </Box>
            <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            >
                <BackgroundBox
                width='80%'
                display='flex'
                justifyContent='spaceAround'
                style={{
                    padding:'32px',
                    backgroundColor:'#00000070'
                }}
                >
                    <Button
                    variant="contained"
                    color='secondary'
                    fullWidth
                    onClick={
                        () => navigate('/signup')
                    }
                    >
                    시작하기
                    </Button>
                    <Typography variant="caption" style={{ margin: '24px auto 0', color:'white'}}>간편 로그인</Typography>
                    <hr width='100%' color='white' style={{ margin: '0'}}/>
                    <form
                    style={{
                        width:'100%'
                    }}
                    >
                        <Button
                            variant="contained"
                            fullWidth
                            style={{
                                marginTop:'16px',
                                backgroundColor:'#FAE100'
                            }}
                            href={`${process.env.REACT_APP_API_URL}/auth/kakao`}
                            startIcon=<RiKakaoTalkFill/>
                        >
                        
                        카카오로 시작하기
                        </Button>
                    </form>
                </BackgroundBox>
            {!loginUser &&
            <Button variant="text" href="/login" color="white" style={{textDecoration:"underline"}}>이미 계정이 있으신가요?</Button>
            }
            </Box>
        </Box>
    );
}

export default Landing;