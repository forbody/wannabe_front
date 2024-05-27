import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from "@mui/material"
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { useEffect, useState } from "react";
import { userApi } from "../../api/services/user";
import { useAuth } from "../../hooks/useAuth";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";

const MyLikingOrLiker = ({open, handleClose, likingOrLiker, ableDel=false}) => {
    const { loginUser } = useAuth();
    const [likingOrLikerProfiles, setlikingOrLikerProfiles] = useState([]);

    // 내가 좋아하는 유저 세부 정보  가져오기
    const getlikingOrLikerInfo = async (id) => {
        try {
            const res = await userApi.getUser(`${id}`, loginUser);
            return res.payload;
            } catch (err) {
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
            const res = await userApi.unlike(`${whereId}`, loginUser)
            if (res.code === 200) {
                console.log('좋아요 취소 성공');
                callback(whereId);
            } else {
                throw new Error(res.message);
            }
        }catch(err) {
            Swal.fire({
                title: "에러 발생",
                text: err.message,
                icon: "error"
            });
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
    }, [likingOrLiker, loginUser]);

    if (likingOrLiker === null) {
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
                width: 400,
                boxShadow: 24,
                p: 4,
                }}
            >
                { likingOrLikerProfiles.length > 0 ?
                <List sx={{ width: '100%', maxWidth: 360 }}>
                    {likingOrLikerProfiles.map((profile, index) => (
                        <div key={profile.id}>
                            <ListItem 
                                alignItems="flex-start"
                                disableGutters
                                secondaryAction={
                                    ableDel &&
                                    <IconButton
                                        onClick={() => handleUnlike(profile.id)}
                                    >
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