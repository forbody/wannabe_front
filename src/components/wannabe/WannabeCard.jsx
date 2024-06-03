import * as React from 'react';
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Modal, Typography } from "@mui/material";
import { userApi } from "../../api/services/user";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import useUserandRoleModel from "../../hooks/useUserandRoleModel";
import { useAuth } from '../../hooks/useAuth';
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { PiSparkleFill } from "react-icons/pi";
import { FaQuestion } from "react-icons/fa";
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Swal from 'sweetalert2';
import WannabeLikeBtn from './WannabeLikeBtn';
import WannabeDetailModal from './WannabeDetailModal';
import { useNavigate } from 'react-router-dom';

const WannabeCard = ({liking, like, unlike}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { loginUser, goToErrPage } = useAuth();
    const theme = useTheme();
    const { userProfile, modelProfile } = useUserandRoleModel();
    const [activeStep, setActiveStep] = useState(0);
    const [roleModels, setRoleModels] = useState(null);
    const [open, setOpen] = React.useState(false);

    // 다음 버튼
    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // 이전 버튼 
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    // 롤모델 바꾸기 버튼
    const handleRoleModel = () => goUpdate(roleModels[activeStep]?.id)

    // 워너비 모달 열기
    const handleOpen = () => setOpen(true);

    // 워너비 모달 닫기
    const handleClose = () => setOpen(false);


    // 랜덤 롤모델 3명 가져오기
    const getRandomRoleModels = async () => {
        try {
            const res = await userApi.getRandomRoleModels(token);
            const arr = [modelProfile, ...res.result]
            setRoleModels(arr);
        } catch (err) {
            goToErrPage(err, () => navigate('/err'));
        }
    }

    // 유저 롤모델 정보 수정
    const goUpdate = async (whoId) =>{
        try{
            if(roleModels){
                const res = await userApi.modifyRoleModel(
                    {role_model_id: whoId}
                    , token)
                if (res.code === 200) {
                    Swal.fire({
                        title: "롤모델을 바꾸었습니다!",
                        text: res.message,
                        icon: "success"
                    });
                    window.location.reload()
                } else {
                    throw new Error(res.message);
                }
            }
        }catch(err) {
            goToErrPage(err, () => navigate('/err'));
        }
    }

    useEffect(() => {
        getRandomRoleModels();
    }, [loginUser, userProfile, modelProfile]);

    // 아직 loginUser, userProfile, modelProfile, roleModels을 못 가져온 상태처리
    if (!loginUser || !userProfile || !modelProfile || !roleModels) {
        return <div>Loading...</div>;
    } 
    
    const steps = [0, 1, 2, 3];

    return (
        <ForegroundBox
            display="flex"
            flexDirection="row"
            style={{
                width:'100%'
            }}
        >
            
        { activeStep === 0 ?
            <CardHeader
            avatar = {
                <Avatar  sx={{ bgcolor: "#33cc33" }} >
                    <PiSparkleFill />
                </Avatar>
            }
            subheader="내가 팔로우 중인 롤모델"
            />
            :
            <CardHeader
            avatar = {
                <Avatar  sx={{ bgcolor: "#b1e33d" }} >
                    <FaQuestion />
                </Avatar>
            }
            subheader="더 많은 롤모델이 궁금하다면?"
            />
        }
        {steps.includes(activeStep) ? (
        <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={roleModels && `http://localhost:8000/${roleModels[activeStep]?.UserDetail[0]?.img}`}
                />
                <CardContent>
                    <span
                    style={{
                        fontSize: 'x-large',
                        fontWeight: 'bold',
                        color: '#33cc33'
                    }}
                    >
                    {roleModels && roleModels[activeStep]?.user_name}
                    </span>
                    <span
                    style={{
                        fontSize: 'large',
                        fontWeight: 'bold',
                        marginLeft: '4px'
                    }}
                    >
                    님의 추천 루틴
                    </span>
                    { activeStep === 0 ?
                    <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    style={{
                        marginTop: '16px'
                    }}
                    onClick={handleOpen}
                    >
                    자세히 보기
                    </Button>
                    :
                    <>
                        <Button
                        fullWidth
                        color="secondary"
                        variant="contained"
                        style={{
                            marginTop: '16px'
                        }}
                        onClick={handleOpen}
                        >
                        자세히 보기
                        </Button>
                        <Button
                        fullWidth
                        color="coral"
                        variant="contained"
                        style={{
                            marginTop: '16px'
                        }}
                        startIcon={<PiSparkleFill/>}
                        onClick={handleRoleModel}
                        >
                        이 롤모델로 바꿀래요
                        </Button>
                    </>
                    }
                    {roleModels && <WannabeDetailModal open={open} handleClose={handleClose} roleModels={roleModels} activeStep={activeStep}/>}
                </CardContent>
                <CardActions>
                    {liking && <WannabeLikeBtn alreadyliked={liking} like_id={roleModels[activeStep]?.id} like={like} unlike={unlike} />}
                    <Typography variant='button' color="error">워너비</Typography>
                </CardActions>
        </Card>) 
        : null
        }
        
        <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === 3}>
                Next
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </Button>
        }
        backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
                Back
            </Button>
        }
        />
    </ForegroundBox>
    );
}

export default WannabeCard;