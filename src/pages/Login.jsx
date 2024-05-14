import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    return ( 
        <>
        <h1>로그인</h1>
        <Button
            variant="contained"
            color='white'
            
            fullWidth

            style={{
                marginTop:'72px'
            }}

            onClick={
                () => navigate('/signup')
            }
        >
        회원가입 페이지
        </Button>
        </>
    );
}

export default Login;