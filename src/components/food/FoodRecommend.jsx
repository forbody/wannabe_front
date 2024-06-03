import { useEffect, useRef, useState } from "react";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { foodApi } from "../../api/services/food";
import { Button, Typography } from '@mui/material';
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { todoApi } from "../../api/services/TodoList";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const FoodRecommend = ({meal}) => {
    const { goToErrPage } = useAuth();
    const navigate = useNavigate();
    // 오늘 날짜 받아오기
    const offset = new Date().getTimezoneOffset() * 60000;
    const currentDate = new Date(Date.now() - offset).toISOString().slice(0, 10);
    localStorage.setItem("date", currentDate);

    const token = localStorage.getItem("token");
    const [dishes, setDishes] = useState(null);
    const [totalCalory, setTotalCalory] = useState(0);
    const [arr, setArr] = useState([]);
    const [recFoodDone, setRecFoodDone] = useState(false);
    const prevMealRef = useRef(meal);

    // meal에 해당하는 리스트가 디비에 존재하는지 찾고
    // 없으면 랜덤 meal 가져오기
    // 있으면 해당 meal 가져오기
    const getTodayDishes = async() => {
        const res = await foodApi.getTodayDishes({
            meal
        }, token);
        setRecFoodDone(res.isAdded)
        setDishes(res.result);
    };

    // meal 추가하기
    const onSetRecommendFood = async() => {
        try {
            const date = localStorage.getItem('date')
            const res = await todoApi.createTodoList({date}, token);
            const todo_list_id = res.payload?.id;
            const res2 = await todoApi.shareTodoEle({
                date,
                todo_list_id,
                arr,
                meal
            }, token);
            if (res.code === 200 && res2.code === 200) {
                console.log("식단추가 성공");
                setRecFoodDone(true);
                prevMealRef.current = meal;
            } else {
                throw new Error(res.message);
            }
        } catch (err) {
            goToErrPage(err, () => navigate('/err'));
        }
    };

    useEffect(() => {
        getTodayDishes();
    }, []);

    useEffect(() => {
        if (dishes) {
            const total = dishes.reduce((sum, d) => sum + d.calory, 0);
            let temp = [];
            dishes.forEach((k) => {
                const obj = { category_id: k.category_id, todo_id: k.id };
                temp.push(obj);
            });
            setArr(temp);
            setTotalCalory(total);
        }
    }, [dishes]);

    // 아직 dishes를 못 가져온 상태처리
    if (!dishes) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <ForegroundBox
                display="flex"
                style={{
                    width: "100%",
                    alignItems: "center",
                }}
            >
                {dishes &&
                    dishes.map((d) => (
                        <Typography>
                            {d.name} {d.calory}kcal
                        </Typography>
                    ))}
                <Typography
                    color="secondary"
                    style={{
                        marginTop: "8px",
                    }}
                >
                    총 칼로리: {totalCalory}kcal
                </Typography>
            </ForegroundBox>
            <ForegroundBox
                display="flex"
                style={{
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <Typography>이 식단이 마음에 들었나요?</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    startIcon={<MdOutlineBookmarkAdd />}
                    style={{
                        marginTop: "8px",
                    }}
                    onClick={() => onSetRecommendFood()}
                    disabled={recFoodDone}
                >
                    나의 {meal} 식단에 추가하기
                </Button>
            </ForegroundBox>
        </>
    );
}

export default FoodRecommend;