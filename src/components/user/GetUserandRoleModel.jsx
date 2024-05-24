import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { userApi } from "../../api/services/user";

const GetUserandRoleModel = () => {
    const { loginUser, getUserInfoByToken } = useAuth();

    const [userProfile, setUserProfile] = useState(null);
    const [modelProfile, setModelProfile] = useState(null);
    const [userImg, setUserImg] = useState("");
    const [modelImg, setModelImg] = useState("");

    // user 정보 가져오기
    const getUserInfo = async () => {
        try {
            const up = await getUserInfoByToken();
            setUserProfile(up);
        } catch (err) {
            console.error("Error fetching user info: ", err);
        }
    };

    // user 이미지 가져오기
    const getUserImg = async () => {
        try {
            if (userProfile) {
                const ud = userProfile.UserDetail;
                const lastProfile = ud.length
                setUserImg(ud[lastProfile-1]?.img)
            }
        } catch (err) {
            console.error("Error fetching user info: ", err);
        }
    };

    // rolemodel 정보 가져오기
    const getModelInfo = async () => {
        try {
            if (userProfile?.role_model_id) {
                const role_model = userProfile.role_model_id;
                const res = await userApi.getUser(`${role_model}`, loginUser);
                setModelProfile(res.payload);
            }
        } catch (err) {
            console.error("Error fetching model info: ", err);
        }
    };

    // rolemodel 이미지 가져오기
    const getModelImg = async () => {
        try {
            if (modelProfile) {
                const md = modelProfile.UserDetail;
                const lastProfile = md.length;
                setModelImg(md[lastProfile - 1]?.img);
            }
        } catch (err) {
            console.error("Error fetching model info: ", err);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, [loginUser]);

    useEffect(() => {
        if (userProfile) {
            getUserImg();
        }
    }, [userProfile]);

    useEffect(() => {
        if (userProfile) {
            getModelInfo();
        }
    }, [userProfile]);

    useEffect(() => {
        if (modelProfile) {
            getModelImg();
        }
    }, [modelProfile]);

    return { userProfile, userImg, modelProfile, modelImg };
};
export default GetUserandRoleModel;
