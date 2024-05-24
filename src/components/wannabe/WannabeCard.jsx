import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { userApi } from "../../api/services/user";
import GetUserandRoleModel from "../../components/user/GetUserandRoleModel";
import { IoHeart } from "react-icons/io5";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { ForegroundBox } from "../styled_comp/StyledDiv";

const WannabeCard = () => {
    const { loginUser } = useAuth()
    const { modelProfile, modelImg } = GetUserandRoleModel();
    const [roleModels, setRoleModels] = useState(null);
     // 랜덤 롤모델 3명 가져오기
    const getRandomRoleModels = async () => {
        try {
            const res = await userApi.getRandomRoleModels(loginUser);
            console.log(res);
            const [roleModel1, roleModel2, roleModel3] = res.result;
            setRoleModels({roleModel1, roleModel2, roleModel3});
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    useEffect(() => {
        getRandomRoleModels();
    }, [loginUser]);

    console.log(roleModels);
    
    // 아직 modelProfile을 못 가져온 상태처리
    if (!modelProfile) {
        return <div>Loading...</div>;
    } 

    // 아직 roleModels를 못 가져온 상태처리
    if (!roleModels) {
        return <div>Loading...</div>;
    } 
    
    return (
        <ForegroundBox
                style={{
                    width:'100%'
                }}
                >
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
                </ForegroundBox>
    );
}

export default WannabeCard;