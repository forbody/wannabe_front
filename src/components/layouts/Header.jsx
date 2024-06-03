import { AppBar, IconButton, Toolbar, Avatar, useScrollTrigger, Slide, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useUserandRoleModel from "../../hooks/useUserandRoleModel";
import { useAuth } from "../../hooks/useAuth";
import logo_green2 from "../../assets/logo_green2.png"

const HideOnScroll = ({ children, window, setShowTopBtn}) => {
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });
    setShowTopBtn(trigger);

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
            <HideOnScroll setShowTopBtn={props.setShowTopBtn}>
            <AppBar color="white" style={{boxShadow:"none"}}>
                <Toolbar
                    display="flex"
                    style={{
                        justifyContent: "space-between",
                        borderLeft: "1px solid #eee",
                        borderRight: "1px solid #eee",
                        borderBottom: "1px solid #eee"
                    }}
                >
                    <Button onClick={goHome}>
                        <img src={logo_green2} alt="logo" width="40px" />
                    </Button>
                    <Button variant="text" color="secondary" onClick={goHome}>
                    Wannabe
                    </Button>
                    <IconButton onClick={goUserMenu}>
                        <Avatar alt="userImg" src={ `http://localhost:8000/${userImg}`} sx={{boxShadow:'0px 0px 2px #888'}}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            </HideOnScroll>
    );
}

export default Header;