import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { foodApi } from "../../api/services/food";
import { Button, Typography } from '@mui/material';

const FoodRecommend = () => {
    const { loginUser } = useAuth()
    const [dishes, setDishes] = useState(null);
    const [totalCalory, setTotalCalory] = useState(0);
    const getDishes = async () => {
        try {
            const res = await foodApi.getRandomDishes(loginUser);
            const [main, side1, side2, side3, dessert] = res.result;
            setDishes({main, side1, side2, side3, dessert});
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    useEffect(() => {
        getDishes();
    }, [loginUser]);

    useEffect(() => {
        if (dishes) {
            const { main, side1, side2, side3, dessert } = dishes;
            const total = [main, side1, side2, side3, dessert].reduce((sum, dish) => sum + (dish?.calory || 0), 0);
            setTotalCalory(total);
        }
    }, [dishes]);

    console.log(dishes);
    
    // 아직 dishes를 못 가져온 상태처리
    if (!dishes) {
        return <div>Loading...</div>;
    } 

    return (
        <>
        <ForegroundBox
            display='flex'
            style={{
                width:'100%',
                alignItems:'center'
            }}
            >
            <Typography>{dishes.main?.name}   {dishes.main?.calory}kcal</Typography>
            <Typography>{dishes.side1?.name}   {dishes.side1?.calory}kcal</Typography>
            <Typography>{dishes.side2?.name}   {dishes.side2?.calory}kcal</Typography>
            <Typography>{dishes.side3?.name}   {dishes.side3?.calory}kcal</Typography>
            <Typography>{dishes.dessert?.name}   {dishes.dessert?.calory}kcal</Typography>
            <Typography 
                color='secondary'
                style={{
                    marginTop:'8px'
                }}
            >총 칼로리: {totalCalory}kcal</Typography>
        </ForegroundBox>
        <ForegroundBox
            display='flex'
            style={{
                width:'100%',
                alignItems:'center'
            }}
        >
            <Typography>이 식단이 마음에 들었나요?</Typography>
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                style={{
                    marginTop:'8px'
                }}
            >내 식단에 추가하기</Button>
        </ForegroundBox>
        
        </>
    );
}

export default FoodRecommend;