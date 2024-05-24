import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { userApi } from "../../api/services/user";
import GetUserandRoleModel from "../../components/user/GetUserandRoleModel";
import { IoHeart } from "react-icons/io5";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const WannabeCard = () => {
    const { loginUser } = useAuth()
    const theme = useTheme();
    const { modelProfile, modelImg } = GetUserandRoleModel();
    const [roleModels, setRoleModels] = useState(null);
    const [randomModelImg, setRandomModelImg] = useState("");
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

    console.log(roleModels);
    // 랜덤 롤모델 3명의 이미지 가져오기
    const getRandomModelImg = async (randomModel) => {
        try {
            if (randomModel) {
                const md = randomModel.UserDetail;
                const lastProfile = md.length;
                setRandomModelImg(md[lastProfile - 1]?.img);
            }
        } catch (err) {
            console.error("Error fetching model info: ", err);
        }
    };

    console.log(roleModels);
    // 랜덤 롤모델 3명의 이미지 가져오기

        // useEffect(() => {
        //     roleModels.forEach(element => {

        //     });
        // })

    useEffect(() => {
        getRandomRoleModels();
    }, [loginUser]);

    /*
    console.log(roleModels?.roleModel1);
    console.log(roleModels?.roleModel2);
    console.log(roleModels?.roleModel3);
    console.log(roleModels?.roleModel1.user_name);
    console.log(roleModels?.roleModel2.user_name);
    console.log(roleModels?.roleModel3.user_name);
    */
    
    // 아직 modelProfile을 못 가져온 상태처리
    if (!modelProfile) {
        return <div>Loading...</div>;
    } 

    // 아직 roleModels를 못 가져온 상태처리
    if (!roleModels) {
        return <div>Loading...</div>;
    } 
    
    let CardStep;

    if (activeStep === 0) {
        CardStep = (
            <Card>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="300"
                    image={`http://localhost:8000/${modelImg}`}
                    />
                    <CardContent>
                    <span
                        style={{
                            fontSize:'x-large',
                            fontWeight:'bold',
                            color: '#33cc33'
                        }}
                    >
                        {modelProfile.user_name}
                    </span>
                    <span
                    style={{
                        fontSize:'large',
                        fontWeight:'bold',
                        marginLeft:'4px'
                    }}
                    >
                        의 추천루틴
                    </span>
                    <Button 
                        fullWidth 
                        color="secondary" 
                        variant="contained"
                        style={{
                        marginTop:'16px'
                    }}>자세히 보기</Button>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button fullWidth color="error" variant="text" startIcon={<IoHeart/> }>
                    좋아요
                    </Button>
                    <Button fullWidth color="secondary" variant="text" startIcon={<MdOutlineBookmarkAdd/> }>
                    내 루틴에 추가
                    </Button>
                </CardActions>
            </Card>
        )
    } else if (activeStep === 1) {
        CardStep = (
        <Card>
            <CardActionArea>
                <CardMedia
                component="img"
                height="300"
                image={`http://localhost:8000/${modelImg}`}
                />
                <CardContent>
                <span
                    style={{
                        fontSize:'x-large',
                        fontWeight:'bold',
                        color: '#33cc33'
                    }}
                >
                    {modelProfile.user_name}
                </span>
                <span
                style={{
                    fontSize:'large',
                    fontWeight:'bold',
                    marginLeft:'4px'
                }}
                >
                    의 추천루틴
                </span>
                <Button 
                    fullWidth 
                    color="secondary" 
                    variant="contained"
                    style={{
                    marginTop:'16px'
                }}>자세히 보기</Button>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button fullWidth color="error" variant="text" startIcon={<IoHeart/> }>
                좋아요
                </Button>
                <Button fullWidth color="secondary" variant="text" startIcon={<MdOutlineBookmarkAdd/> }>
                내 루틴에 추가
                </Button>
            </CardActions>
        </Card>
        )
    } else if (activeStep === 2) {
        CardStep = (
        <Card>
            <CardActionArea>
                <CardMedia
                component="img"
                height="300"
                image={`http://localhost:8000/${modelImg}`}
                />
                <CardContent>
                <span
                    style={{
                        fontSize:'x-large',
                        fontWeight:'bold',
                        color: '#33cc33'
                    }}
                >
                    {modelProfile.user_name}
                </span>
                <span
                style={{
                    fontSize:'large',
                    fontWeight:'bold',
                    marginLeft:'4px'
                }}
                >
                    의 추천루틴
                </span>
                <Button 
                    fullWidth 
                    color="secondary" 
                    variant="contained"
                    style={{
                    marginTop:'16px'
                }}>자세히 보기</Button>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button fullWidth color="error" variant="text" startIcon={<IoHeart/> }>
                좋아요
                </Button>
                <Button fullWidth color="secondary" variant="text" startIcon={<MdOutlineBookmarkAdd/> }>
                내 루틴에 추가
                </Button>
            </CardActions>
        </Card>
        )
    } else if (activeStep === 3) {
        CardStep = (
        <Card>
            <CardActionArea>
                <CardMedia
                component="img"
                height="300"
                image={`http://localhost:8000/${modelImg}`}
                />
                <CardContent>
                <span
                    style={{
                        fontSize:'x-large',
                        fontWeight:'bold',
                        color: '#33cc33'
                    }}
                >
                    {modelProfile.user_name}
                </span>
                <span
                style={{
                    fontSize:'large',
                    fontWeight:'bold',
                    marginLeft:'4px'
                }}
                >
                    의 추천루틴
                </span>
                <Button 
                    fullWidth 
                    color="secondary" 
                    variant="contained"
                    style={{
                    marginTop:'16px'
                }}>자세히 보기</Button>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button fullWidth color="error" variant="text" startIcon={<IoHeart/> }>
                좋아요
                </Button>
                <Button fullWidth color="secondary" variant="text" startIcon={<MdOutlineBookmarkAdd/> }>
                내 루틴에 추가
                </Button>
            </CardActions>
        </Card>
        )
    }

    return (
        <ForegroundBox
                display="flex"
                flexDirection="row"
                style={{
                    width:'100%'
                }}
                >
                {CardStep}
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