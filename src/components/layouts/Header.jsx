import { AppBar, Box, IconButton, Typography, Toolbar, Avatar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import GetUserandRoleModel from "../user/GetUserandRoleModel";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();
    const goUserMenu = () => navigate('/my')
    const goHome = () => navigate('/todolist')
    const { userImg } = GetUserandRoleModel();

    const noShowHeader = ['/', '/login', '/signup'] // 여기에 페이지 주소를 넣으면 상단 바가 사라집니다.
    if (!loginUser || noShowHeader.includes(location.pathname)) {
        return null;
    }

    return (
        <Box style={{width:'100%'}}>
        <AppBar position="static" color="white" style={{boxShadow:"none"}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={goHome}>
                Wannabe
                </Typography>
                <IconButton onClick={goUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="userImg" src={ `http://localhost:8000/${userImg}`} />
                </IconButton>
            </Toolbar>
        </AppBar>
        </Box>
    );
}

export default Header;