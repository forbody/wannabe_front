import * as React from 'react';
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { userApi } from "../../api/services/user";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import GetUserandRoleModel from "../../components/user/GetUserandRoleModel";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { IoHeart } from "react-icons/io5";
import { PiSparkleFill } from "react-icons/pi";
import { FaQuestion } from "react-icons/fa";
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Swal from 'sweetalert2';

const WannabeCard = () => {
    const { loginUser } = useAuth()
    const theme = useTheme();
    const { modelProfile } = GetUserandRoleModel();
    const [roleModels, setRoleModels] = useState(null);
    const [activeStep, setActiveStep] = React.useState(0);

    // 다음 버튼
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // 이전 버튼 
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    // 랜덤 롤모델 3명 가져오기
    const getRandomRoleModels = async () => {
        try {
            const res = await userApi.getRandomRoleModels(loginUser);
            const arr = [modelProfile, ...res.result]
            setRoleModels(arr);
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const handleLike = () => {
        like()
    }

    // 좋아요 기능
    const like = async () => {
        try{
            const res = await userApi.like(`${roleModels[activeStep]?.id}`, loginUser)
            if (res.code === 200) {
                console.log('좋아요 성공');
                console.log(res);
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
        getRandomRoleModels();
    }, [loginUser, modelProfile]);

    // 아직 modelProfile을 못 가져온 상태처리
    if (!modelProfile) {
        return <div>Loading...</div>;
    } 

    // 아직 roleModels를 못 가져온 상태처리
    if (!roleModels) {
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
            <CardActionArea>
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
                    의 추천루틴
                    </span>
                    <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    style={{
                        marginTop: '16px'
                    }}
                    >
                    자세히 보기
                    </Button>
                </CardContent>
            </CardActionArea>
            { activeStep === 0 ?
            <CardActions>
                <Button fullWidth color="error" variant="text" startIcon={<IoHeart />} onClick={handleLike}>
                    워너비
                </Button>
            </CardActions>
            :   
            <CardActions>
                <Button fullWidth color="error" variant="text" startIcon={<IoHeart />} onClick={handleLike}>
                    워너비
                </Button>
                <Button fullWidth color="secondary" variant="text" startIcon={<PiSparkleFill />}>
                    팔로우
                </Button>
            </CardActions>
            }
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