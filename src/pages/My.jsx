import Button from '@mui/material/Button'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const My = () => {
    const { loginUser, login, logout } = useAuth()
    const navigate = useNavigate();
    return ( 
        <>
        <h1>마이페이지</h1>
        <Button variant="contained" color="white" onClick={() => logout( () => { navigate('/') } )}>로그아웃</Button>
        </>
    );
}

export default My;