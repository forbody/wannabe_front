import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import { ForegroundBox } from '../styled_comp/StyledDiv';
import { TfiWrite } from "react-icons/tfi";
import { FaUserEdit } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";
import { Divider, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { userApi } from '../../api/services/user';

const MyButtons = ({ loginUser, logout }) => {
    const navigate = useNavigate();
    const deleteUser = () => {
        try{
            Swal.fire({
                title: "정말 저희를 떠나시나요?😭",
                text: "이 작업은 되돌릴 수 없습니다!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "네, 탈퇴합니다!",
                cancelButtonText: "아니요"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await userApi.deleteUser(loginUser)
                    if (res.code === 200) {
                    Swal.fire({
                    title: "회원탈퇴가 성공적으로 되었습니다!",
                    text: "안녕히 가세요.",
                    icon: "success"
                    });
                    logout(() => navigate('/'));
                    } else {
                        throw new Error(res.message);
                    }
                } 
            });
        }catch(err) {
            Swal.fire({
                title: "에러 발생",
                text: err.message,
                icon: "error"
            });
        }
        
    } 
    return ( 
        <ForegroundBox
            display='flex'
            style={{
                width:'100%',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
            >
            <Typography
            display='flex'
            variant='h6'
            fontWeight='600'
            style={{
                marginBottom:'8px',
                justifyContent:'center'
            }}
            >
                나의 정보 관리
            </Typography>
            <Button variant="text" size="large" color="secondary" startIcon={<TfiWrite/>} onClick={() => navigate('/my/shareList')} fullWidth>내가 작성한 글 보기</Button>
            <Divider/>
            <Button variant="text" size="large" color="primary" startIcon={<FaUserEdit/>} onClick={ () => navigate('/my/modify') } fullWidth>나의 정보 수정</Button>
            <Divider/>
            <Button variant="text" size="large" color="warning" startIcon={<FaUserMinus/>} onClick={() => logout( () => { navigate('/') } )} fullWidth>로그아웃</Button>
            <Divider/>
            <Button variant="text" size="large" color="error" startIcon={<FaUserMinus/>} onClick={ deleteUser } fullWidth>회원탈퇴</Button>
        </ForegroundBox>
    );
}

export default MyButtons;