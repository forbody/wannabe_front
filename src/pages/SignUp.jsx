import { Button, InputLabel, TextField, Box, FormControl, OutlinedInput } from '@mui/material/'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Typography from '@mui/material/Typography'
import axios from 'axios'

const SignUp = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    // 회원가입 버튼 동작
    const onRegist = (async (data) => {
        const { email, nickname, password, passwordCheck } = data
        try {
            if (email && nickname && password && passwordCheck && (password === passwordCheck)) {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/join`, {
                    email,
                    nickname,
                    password
                })
                if (res.data.code === 200){
                    Swal.fire({
                        title: "축하합니다!",
                        text: res.data.message,
                        icon: "success"
                    });
                    navigate('/')
                } else {
                    throw new Error(res.data.message);
                }
            } else {
                throw new Error("입력값을 확인해주세요.")
            }
        } catch (err) {
            Swal.fire({
                title: "입력값을 확인 후 다시 시도해주세요!",
                text: err.message,
                icon: "error"
            });
        }
    })

    return (
        <>
            <Typography variant="h4" sx={{marginTop:"16px"}}>회원가입</Typography>
            {/* form tag 시작 */}
            <Box
                component="form"
                my={4}
                p={4}
                borderRadius={4}
                boxShadow={'0 0 4px grey'}
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    display:"flex",
                    flexDirection:"column"
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onRegist)}
                backgroundColor='#fff'
            >
                <TextField
                    error={errors.email ? true : false}
                    helperText={errors.email && "이메일은 필수 입력값입니다."}
                    label="이메일"
                    variant="outlined"
                    sx={{ display: 'block' }}
                    autoFocus
                    fullWidth
                    required
                    {...register("email", { required: true })}
                />
                {/* nickname */}
                <TextField
                    error={errors.nickname ? true : false}
                    helperText={errors.nickname && "닉네임은 필수 입력값입니다."}
                    label="닉네임"
                    variant="outlined"
                    sx={{ display: 'block' }}
                    fullWidth
                    required
                    {...register("nickname", { required: true })}
                />
                {/* password */}
                <FormControl sx={{ m: 1, width: '25ch', display: 'block' }} variant="outlined">
                    <InputLabel htmlFor="password">비밀번호</InputLabel>
                    <OutlinedInput
                        {...register("password", { required: true })}
                        id="password"
                        autoComplete="new-password"
                        type='password'
                        error={errors.password ? true : false}
                        fullWidth
                        required
                        helperText={errors.password && "비밀번호는 필수 입력값입니다."}
                        label="비밀번호"
                    />
                </FormControl>
                {/* password check */}
                <FormControl sx={{ m: 1, width: '25ch', display: 'block' }} variant="outlined">
                    <InputLabel htmlFor="PasswordCheck">비밀번호 확인</InputLabel>
                    <OutlinedInput
                        {...register("passwordCheck", { required: true })}
                        id="PasswordCheck"
                        autoComplete="new-password"
                        error={errors.passwordCheck ? true : false}
                        type='password'
                        fullWidth
                        label="비밀번호 확인"
                    />
                </FormControl>
                {/* button */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button type='suibmit' variant="contained"  sx={{ display: 'block', width: '49%', color: "#f2f2f2" }}>회원가입</Button>
                    <Button variant="contained"  sx={{ display: 'block', width: '49%', color: "#f2f2f2"}} onClick={(e) => {
                        e.preventDefault()
                        reset();
                    }} >초기화</Button>
                </Box>
            </Box>
        </>
    );
}
export default SignUp;