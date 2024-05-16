import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackgroundBox, ForegroundBox } from './../components/styled_comp/StyledDiv';
import { useForm } from "react-hook-form";

const Login = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()
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
                    <TextField
                    required
                    variant="filled"
                    id="email"
                    label="이메일을 입력해 주세요"
                    style={{
                        marginTop:'32px'
                    }}
                    />
                    <TextField
                    required
                    variant="filled"
                    id="password"
                    label="비밀번호를 입력해 주세요"
                    style={{
                        marginTop:'32px'
                    }}
                    />
                    <Button
                        variant="contained"
                        color='secondary'
                        style={{
                            width:'100%',
                            margin:'72px auto 0'
                        }}
                        onClick={
                            () => navigate('/signup')
                        }
                    >
                    로그인
                    </Button>
                </ForegroundBox>
            </BackgroundBox>
        </Box>
    );
}

export default Login;