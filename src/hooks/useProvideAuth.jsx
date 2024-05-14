import { useState } from "react";
import axios from 'axios';
import { Cookies } from "react-cookie";

export const useProvideAuth = () => {
    const [loginUser, setLoginUser] = useState({
        id: localStorage.getItem('userId'),
        token : localStorage.getItem("token")
    });

    const kakaoLogin = () => {
        const cookies = new Cookies();
        if (cookies.get('accessToken') && cookies.get('userId')) {
            localStorage.setItem('userId', cookies.get('userId'));
            localStorage.setItem('token', cookies.get('accessToken'));
            setLoginUser({
                id: cookies.get('userId'),
                token: cookies.get('accessToken')
            });  
        } 
        cookies.remove("userId");
        cookies.remove("accessToken");
    }

    const login = async (callback, data) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                data
            );
            if (response.data.code === 200) {
                const id = response.data.userId;
                const token = response.data.accessToken;
                localStorage.setItem('userId', id);
                localStorage.setItem('token', token);
                setLoginUser({
                    id: id,
                    token
                });
            }
            callback(response);
        } catch (error) {
            console.error(error);
        }
    }

    const logout = (callback) => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        setLoginUser(null);
        // 리프레시 토큰 삭제
        callback();
    }

    return {
        loginUser,
        login,
        logout,
        kakaoLogin
    }
}