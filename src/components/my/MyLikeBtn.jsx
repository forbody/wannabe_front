import { Box, Button, ButtonGroup } from "@mui/material";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { userApi } from "../../api/services/user";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import MyLikingOrLiker from "./MyLikingOrLiker";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const MyLikeBtn = ({userProfile}) => {
    const { goToErrPage } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [liking, setLiking] = useState();
    const [liker, setLiker] = useState();
    
    const [likingOpen, setLikingOpen] = useState(false);
    const [likerOpen, setLikerOpen] = useState(false);

    const handleLikingOpen = () => setLikingOpen(true);
    const handleLikingClose = () => setLikingOpen(false);

    const handleLikerOpen = () => setLikerOpen(true);
    const handleLikerClose = () => setLikerOpen(false);

    // 내가 좋아하는 사람 가져오기 기능
    const getLikings = async () => {
        try{
            if (userProfile){
                const res = await userApi.getLikings(`${userProfile?.id}`, token)
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
    }

    // 나를 좋아하는 사람 가져오기 기능
    const getLikers = async () => {
        try{
            if (userProfile){
                const res = await userApi.getLikers(`${userProfile?.id}`, token)
                if (res.code === 200) {
                    console.log('나를 좋아하는 사람 가져오기 성공');
                    setLiker(res.payload)
                } else {
                    throw new Error(res.message);
                }
            }
        }catch(err) {
            goToErrPage(err, () => navigate('/err'));
        }
    }

    useEffect(() => {
        getLikings();
    }, [userProfile, likingOpen]);
    
    useEffect(() => {
        getLikers();
    }, [ userProfile, likerOpen]);
    

    // 아직 userProfile을 못 가져온 상태처리
    if (!userProfile ) {
        return <div>Loading...</div>;
    } 

    return (
        <ForegroundBox
        display='flex'
        style={{
            width:'100%',
            flexDirection:'column',
            justifyContent: 'space-between'
        }}
        >
            <Box
            display='flex'
            style={{
                width:'100%',
                justifyContent: 'space-around'
            }}
            >
                <span style={{fontWeight:'bold'}}>{liking ? liking.length : 0}</span>
                <span style={{fontWeight:'bold'}}>{liker ? liker.length : 0}</span>
            </Box>
            <ButtonGroup variant="text" size="large" aria-label="wannabe button group">
                <Button color="secondary" fullWidth onClick={handleLikingOpen}>워너빙</Button>
                <Button color="secondary" fullWidth onClick={handleLikerOpen}>워너버</Button>
            </ButtonGroup>
            <MyLikingOrLiker open={likingOpen} handleClose={handleLikingClose} likingOrLiker={liking} mylike={true} />
            <MyLikingOrLiker open={likerOpen} handleClose={handleLikerClose} likingOrLiker={liker} />
        </ForegroundBox>
    );
}

export default MyLikeBtn;