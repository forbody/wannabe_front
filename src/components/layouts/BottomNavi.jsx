import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IoIosFitness } from "react-icons/io";
import { PiBowlFoodFill } from "react-icons/pi";
import { HiHome } from "react-icons/hi2";
import { PiSparkleFill } from "react-icons/pi";
import { IoPerson } from "react-icons/io5";

const BottomNavi = () => {
    const navigate = useNavigate();
    const [menus, setMenus] = useState([
        { path: '/exercise', label : "운동", value : "운동", icon: <IoIosFitness /> },
        { path: '/food', label : "식단", value : "식단", icon: <PiBowlFoodFill /> },
        { path: '/todolist', label : "홈", value : "홈", icon: <HiHome /> },
        { path: '/wannabe', label : "워너비", value : "워너비", icon: <PiSparkleFill /> },
        { path: '/my', label : "마이", value : "마이", icon: <IoPerson /> },
    ]);

    const [value, setValue] = useState("홈");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const location = useLocation();
    
    const noShowBottomNavi = ['/', '/login', '/signup'] // 여기에 페이지 주소를 넣으면 하단 바가 사라집니다.
    if (noShowBottomNavi.includes(location.pathname)) {
        return null;
    }
    
    return (
        <Paper 
            sx={{ 
                width: '375px', 
                position: 'absolute', 
                bottom: 0, 
                zIndex: 2
                }}
            elevation={3}
        >
            <BottomNavigation
            showLabels
            value={value}
            onChange={handleChange}
            >
                {
                    menus.map((m, idx) => (
                    <BottomNavigationAction
                        key={idx}
                        onClick={
                            () => navigate(m.path)
                        }
                        label={m.label}
                        value={m.value}
                        icon={m.icon}
                        sx={{ minWidth: '75px' }}
                    />
                    ))
                }
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNavi;