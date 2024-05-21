import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { foodApi } from "../../api/services/food";
import { Typography } from '@mui/material';

const FoodRecommend = () => {
    const { loginUser } = useAuth()

    const [mainDishes, setMainDishes] = useState(null);
    const [sideDishes, setSideDishes] = useState(null);
    const [desserts, setDesserts] = useState(null);
    
    const [mainDish, setMainDish] = useState(null);
    const [sideDish, setSideDish] = useState(null);
    const [dessert, setDessert] = useState(null);

    const getDishes = async () => {
        try {
            const sort1 = 'main_dish'
            const sort2 = 'side_dish'
            const sort3 = 'dessert'
            const res1 = await foodApi.getDishes(`${sort1}`, loginUser);
            const res2 = await foodApi.getDishes(`${sort2}`, loginUser);
            const res3 = await foodApi.getDishes(`${sort3}`, loginUser);
            setMainDishes(res1.payload);
            setSideDishes(res2.payload);
            setDesserts(res3.payload);
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const mainlen =  mainDishes?.length
    const sidelen =  sideDishes?.length
    const dessertlen =  desserts?.length

    const getDish = async () => {
        try {
            if (mainlen + sidelen + dessertlen) {
                const randomNumberMain = Math.floor(Math.random() * mainlen)
                const randomNumberSide = Math.floor(Math.random() * sidelen) + mainlen
                const randomNumberDessert = Math.floor(Math.random() * dessertlen) + mainlen + sidelen
                console.log(randomNumberMain, randomNumberSide, randomNumberDessert);
                const res1 = await foodApi.getDish(`${randomNumberMain}`, loginUser);
                const res2 = await foodApi.getDish(`${randomNumberSide}`, loginUser);
                const res3 = await foodApi.getDish(`${randomNumberDessert}`, loginUser);
                setMainDish(res1.payload);
                setSideDish(res2.payload);
                setDessert(res3.payload);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    useEffect(() => {
        getDishes();
    }, [loginUser]);

    useEffect(() => {
        getDish();
    }, [mainDishes, sideDishes, desserts]);

    // 아직 Dishes를 못 가져온 상태처리
    if (mainDishes === null || sideDishes === null || desserts === null) {
        return <div>Loading...</div>;
    } 

    // 아직 Dish를 못 가져온 상태처리
    if (mainDish === null || sideDish === null || dessert === null) {
        return <div>Loading...</div>;
    } 

    return (
        <ForegroundBox
            display='flex'
            style={{
                width:'100%',
                alignItems:'center'
            }}
            >
                <Typography>
                    {mainDish.name} {mainDish.calory}kcal
                </Typography>
                <Typography>
                    {sideDish.name} {sideDish.calory}kcal
                </Typography>
                <Typography>
                    {dessert.name} {dessert.calory}kcal
                </Typography>
        </ForegroundBox>
    );
}

export default FoodRecommend;