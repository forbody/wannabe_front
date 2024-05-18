import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import { ForegroundBox } from '../styled_comp/StyledDiv';

const MyButtons = ({ logout }) => {
    
    const navigate = useNavigate();

    return ( 
        <ForegroundBox
            display='flex'
            style={{
                width:'100%',
                height:'200px',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
            >
            <Button variant="contained" color="primary" fullWidth>내가 작성한 글 보기</Button>
            <Button variant="contained" color="secondary" fullWidth>내 정보 수정</Button>
            <Button variant="contained" color="warning" onClick={() => logout( () => { navigate('/') } )} fullWidth>로그아웃</Button>
        </ForegroundBox>
    );
}

export default MyButtons;