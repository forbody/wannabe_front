import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from "@mui/material"
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { useEffect, useState } from "react";
import { userApi } from "../../api/services/user";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const MyLikingOrLiker = ({open, handleClose, likingOrLiker, mylike=false}) => {
    const { goToErrPage } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [likingOrLikerProfiles, setlikingOrLikerProfiles] = useState([]);
    
    
    // 내가 좋아하는 유저 세부 정보  가져오기
    const getlikingOrLikerInfo = async (id) => {
        try {
            const res = await userApi.getUser(`${id}`, token);
            return res.payload;
            } 
        catch (err) {
            console.error("내가 좋아하는 유저 세부 정보 가져오기 실패", err);
            return null;
        }
    };
    const handleUnlike = (wannabe_id) => {
        const callback = (wannabe_id) => setlikingOrLikerProfiles(likingOrLikerProfiles.filter(profile => profile.id !== wannabe_id));
        unlike(wannabe_id, callback);
    }

    // 좋아요 취소 기능
    const unlike = async (whereId, callback) => {
        try{
            const res = await userApi.unlike(`${whereId}`, token)
            if (res.code === 200) {
                console.log('좋아요 취소 성공');
                callback(whereId);
            } else {
                throw new Error(res.message);
            }
        }catch(err) {
            goToErrPage(err, () => navigate('/err'));
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            if (likingOrLiker) {
                const profiles = await Promise.all(likingOrLiker.map(user => getlikingOrLikerInfo(user.id)));
                setlikingOrLikerProfiles(profiles.filter(profile => profile !== null));
            }
        };
        fetchUsers();
    }, [likingOrLiker]);

    // 아직 likingOrLiker을 못 가져온 상태처리
    if (!likingOrLiker) {
        return <div>Loading...</div>;
    }

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="likingOrLiker-modal-title"
        aria-describedby="likingOrLiker-modal-description"
        >
            <ForegroundBox
            style = {{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                boxShadow: 24,
                p: 4,
                }}
            >
                {mylike ? 
                    <Typography
                        variant="h6"
                        display="flex"
                        justifyContent="center"
                    >워너빙</Typography>
                :
                    <Typography
                    variant="h6"
                    display="flex"
                    justifyContent="center"
                    >워너버</Typography>
                }
                { likingOrLikerProfiles.length > 0 ?
                <List sx={{ width: '100%', maxWidth: 360 }}>
                    {likingOrLikerProfiles.map((profile, index) => (
                        <div key={profile.id}>
                            <ListItem 
                                alignItems="flex-start"
                                disableGutters
                                secondaryAction={
                                    mylike &&
                                    <IconButton onClick={() => handleUnlike(profile.id)}>
                                        <TiDelete/>
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar alt={profile.user_name} src={`http://localhost:8000/${profile.UserDetail[0]?.img}`} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={profile.user_name}
                                    secondary={profile.email}
                                />
                            </ListItem>
                            {index < likingOrLikerProfiles.length - 1 && <Divider variant="inset" component="li" />}
                        </div>
                    ))}
                </List>
                :
                <Typography>당신만의 워너비를 모아보세요!</Typography>
                }
            </ForegroundBox>
        </Modal>
    );
}

export default MyLikingOrLiker;