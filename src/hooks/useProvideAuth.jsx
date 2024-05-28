import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { userApi } from "../api/services/user";

export const useProvideAuth = () => {
    const [loginUser, setLoginUser] = useState(localStorage.getItem("token"));
        
    const kakaoLogin = () => {
        const cookies = new Cookies();
        if (cookies.get('accessToken') && cookies.get('userId')) {
            localStorage.setItem('token', cookies.get('accessToken'))
            setLoginUser(cookies.get('accessToken'));
        }
        cookies.remove('userId')
        cookies.remove('accessToken')
    }

    const login = async(fCallback, sCallback, data) => {
        try{
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/login`, 
                data
            );
            if (response.data.code === 200) {
                const id = response.data.userId
                const token = response.data.accessToken;
                localStorage.setItem('token', token)
                setLoginUser(token);
                sCallback(response);
            } else {
                fCallback();
            }
        } catch(err) {
            console.error(err);
            fCallback();
        }
    }

    const logout = (callback) => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        setLoginUser(null);
        localStorage.removeItem("date")
        // 리프레쉬 토큰 삭제
        callback();
    }

    const getUserInfoByToken = async () => {
        try {
            const userInfo = jwtDecode(loginUser);
            const userId = userInfo.id;
            const res = await userApi.getUser(`${userId}`, loginUser);
            return res.payload
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    return {
        loginUser,
        login,
        logout,
        kakaoLogin,
        getUserInfoByToken
    }
}