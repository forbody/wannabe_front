import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button'
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { BackgroundBox } from '../components/styled_comp/StyledDiv';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Landing = () => {
    const navigate = useNavigate()
    const { loginUser, login, logout, kakaoLogin } = useAuth();
    kakaoLogin();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const onSubmit = (data) => {
        // 로그인 시켜주기
        login((res) => {
        if (res.data.code !== 200) {
            Toast.fire({
            icon: "error",
            title: "로그인에 실패했습니다.",
            text: '아이디 또는 비밀번호를 다시 확인해주세요'
            });
        } else {
            navigate('/todolist')
            Toast.fire({
                icon: "success",
                title: "환영합니다~!"
            });
        }
        }, data)
        reset();
    };

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
                    <form>
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
                
            </Box>
        </>
    );
}

export default Landing;