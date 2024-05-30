import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { BackgroundBox, ForegroundBox } from './../components/styled_comp/StyledDiv';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useAuth } from "../hooks/useAuth";
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import { RiKakaoTalkFill } from "react-icons/ri";

const Login = () => {
    const { login, kakaoLogin } = useAuth();
    kakaoLogin();
    
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
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
        login(
            (response)=>
                Toast.fire({icon: "error", title: "로그인에 실패했습니다.", text: '아이디 또는 비밀번호를 다시 확인해주세요'})
            ,
            () => {
                Toast.fire({icon: "success", title: "환영합니다~!"})
                navigate('/todolist')
            }
            ,
            data
        );
        reset();
    };
    
    return ( 
        <Box
            width='80%'
            height='100vh'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
        >
            <Typography
                variant='h6'
                fontWeight='600'
            >
            로그인
            </Typography>
            <BackgroundBox
                display='flex'
                justifyContent='space-around'
                style={{
                    width:'100%',
                    marginTop:'36px',
                    padding: '16px'
                }}
            >
                <ForegroundBox
                    style={{
                        margin:'24px 0',
                        padding: '16px'
                    }}
                >
                    <form onSubmit={handleSubmit(onSubmit)}
                    style={{
                        width:'100%'
                    }}
                    >
                    <FormControl
                    style={{
                        width:'100%'
                    }}
                    >
                    <OutlinedInput
                    type="text" 
                    id="email"
                    placeholder="이메일을 입력해 주세요"
                    {...register("email", { required: true })} 
                    style={{
                        marginTop:'32px'
                    }}
                    fullWidth
                    />{errors.email && <Typography color="error">이메일은 필수값입니다.</Typography>}
                    </FormControl>
                    <FormControl
                    style={{
                        width:'100%'
                    }}
                    >
                    <OutlinedInput
                    type="password" 
                    id="password"
                    placeholder="비밀번호를 입력해 주세요"
                    {...register("password", { required: true })}
                    style={{
                        marginTop:'24px'
                    }}
                    fullWidth
                    />{errors.password && <Typography color="error">비밀번호는 필수값입니다.</Typography>}
                    </FormControl>
                    <Button
                        variant="contained"
                        color='secondary'
                        type='submit'
                        style={{
                            width:'100%',
                            margin:'48px auto 0'
                        }}
                        
                    >
                    로그인
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        style={{
                            margin:'16px 0 32px',
                            backgroundColor:'#FAE100'
                        }}
                        href={`${process.env.REACT_APP_API_URL}/auth/kakao`}
                        startIcon=<RiKakaoTalkFill/>
                    >
                    카카오 로그인
                    </Button>
                    </form>
                </ForegroundBox>
            </BackgroundBox>
            <Button variant="text" href="/signup" color="white" style={{textDecoration:"underline"}}>회원가입이 필요하신가요?</Button>
        </Box>
    );
}

export default Login;