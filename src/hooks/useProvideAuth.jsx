import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { userApi } from "../api/services/user";
import { createBrowserRouter } from "react-router-dom";

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

    const logout = async(callback) => {
        // 리프레쉬 토큰 null로 변경
        try{
            const token = localStorage.getItem("token");
            const res = await userApi.modifyRefreshToken(
                {refresh_token: null}
                , token)
            if (res.code === 200) {
                console.log("리프레쉬 토큰 null로 변경 완료");
                setLoginUser(null);
                localStorage.removeItem("userId");
                localStorage.removeItem("token");
                localStorage.removeItem("date")
            } else {
                throw new Error(res.message);
            }
        } catch(err) {
            console.error(err);
        }
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

    const goToErrPage = (err, callback) => {
        console.log(err);
        logout(() => callback());
    }

    return {
        loginUser,
        login,
        logout,
        kakaoLogin,
        getUserInfoByToken,
        goToErrPage
    }
}