import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export const useProvideAuth = () => {
    const [loginUser, setLoginUser] = useState({
        id: localStorage.getItem("userId"),
        token : localStorage.getItem("token")
    })
        
    const kakaoLogin = () => {
        const cookies = new Cookies();
        if (cookies.get('accessToken') && cookies.get('userId')) {
            localStorage.setItem('userId', cookies.get('userId'))
            localStorage.setItem('token', cookies.get('accessToken'))
            console.log(cookies.get('accessToken'), cookies.get('userId'));
            setLoginUser({
                id: cookies.get('userId'), 
                token: cookies.get('accessToken')
            });
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
                localStorage.setItem('userId', id)
                localStorage.setItem('token', token)
                setLoginUser({
                    id, token
                });
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

        setLoginUser({
            id: null, token: null
        });

        localStorage.removeItem("date")
        

        // 리프레쉬 토큰 삭제
        callback();
    }

    return {
        loginUser,
        login,
        logout,
        kakaoLogin
    }
}