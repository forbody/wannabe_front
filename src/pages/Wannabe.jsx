import { useEffect, useState } from "react";
import { todoApi } from "../api/services/TodoList";
import { BackgroundBox, PageBox} from "../components/styled_comp/StyledDiv";
import { Box } from "@mui/material";
import ShowTodoList from "../components/wannabe/ShowTodoList";
import WannabeCard from "../components/wannabe/WannabeCard";
import { useAuth } from "../hooks/useAuth";
import Swal from 'sweetalert2';
import { userApi } from './../api/services/user';
import { useNavigate } from "react-router-dom";

const Wannabe = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { loginUser, getUserInfoByToken, goToErrPage } = useAuth();
    const [shareList, setShareList] = useState();
    const [isChange, setIsChange] = useState(false);
    const [liking, setLiking] = useState([]);

    // 내가 좋아하는 사람 가져오기 기능
    const getLikings = async () => {
        try{
            const loginUserInfo = await getUserInfoByToken();
            if (loginUser) {
                const res = await userApi.getLikings(loginUserInfo.id, token)
                if (res.code === 200) {
                    console.log('내가 좋아하는 사람 가져오기 성공');
                    setLiking(res.payload)
                } else {
                    throw new Error(res.message);
                }
            }
        }catch(err) {
            goToErrPage(err, () => navigate('/err'));
        }
    };

    // 좋아요 기능
    const like = async (whereId) => {
        try{
            const res = await userApi.like(`${whereId}`, token)
            if (res.code === 200) {
                console.log('좋아요 성공');
                getLikings();
            } else {
                throw new Error(res.message);
            }
        }catch(err) {
            goToErrPage(err, () => navigate('/err'));
        }
    }

    // 좋아요 취소 기능
    const unlike = async (whereId) => {
        try{
            const res = await userApi.unlike(`${whereId}`, token)
            if (res.code === 200) {
                console.log('좋아요 취소 성공');
                getLikings();
            } else {
                throw new Error(res.message);
            }
        }catch(err) {
            goToErrPage(err, () => navigate('/err'));
        }
    }

    const getShareList = async() => {
        try {
            const res = await todoApi.getShareList(token);
            setShareList(res.payload)
        } catch (err) {
            goToErrPage(err, () => navigate('/err'));
        }
    }

    useEffect(() => {
        getLikings();
    }, [loginUser]);

    useEffect(() =>{
        getShareList()
    }, [isChange]);

    return ( 
        <PageBox>
            <BackgroundBox style={{ justifyContent: 'center'}}>
                <WannabeCard liking={liking} like={like} unlike={unlike}/>
            </BackgroundBox>
            <BackgroundBox style={{ justifyContent: 'center', marginTop : '10px' }}>
                {shareList?.map((e) => (
                    <ShowTodoList liking={liking} like={like} unlike={unlike} e={e} key={e.id} setIsChange={setIsChange} />
                ))}
            </BackgroundBox>
        </PageBox>
    );
}

export default Wannabe;
