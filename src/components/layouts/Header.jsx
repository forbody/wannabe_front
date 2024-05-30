import { AppBar, IconButton, Typography, Toolbar, Avatar, useScrollTrigger, Slide } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useUserandRoleModel from "../../hooks/useUserandRoleModel";
import { useAuth } from "../../hooks/useAuth";

const HideOnScroll = ({ children, window }) => {
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger} sx={{position: 'sticky'}}>
            {children}
        </Slide>
    );
};

const Header = (props) => {
    const { loginUser } = useAuth();
    const { userImg } = useUserandRoleModel();
    const navigate = useNavigate()
    const location = useLocation();
    const goUserMenu = () => navigate('/my')
    const goHome = () => navigate('/todolist')
    
    // 여기에 페이지 주소를 넣으면 상단 바가 사라집니다.
    const noShowHeader = ['/', '/login', '/signup'] 
    if (!loginUser || noShowHeader.includes(location.pathname)) {
        return null;
    }

    return (
            <HideOnScroll>
            <AppBar color="white" style={{boxShadow:"none"}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={goHome}>
                    Wannabe
                    </Typography>
                    <IconButton onClick={goUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="userImg" src={ `http://localhost:8000/${userImg}`} sx={{boxShadow:'0px 0px 2px #888'}}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            </HideOnScroll>
    );
}

export default Header;