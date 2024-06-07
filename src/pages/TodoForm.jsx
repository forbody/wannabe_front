import { Box, Button, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { BackgroundBox, ForegroundBox, PageBox } from '../components/styled_comp/StyledDiv';
import DropDownForm from "../components/todo_list/DropDownForm";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../api/services/TodoList';
import NumberInput from '../components/todo_list/NumberInput';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/useAuth';

const TodoForm = () => {
    const token = localStorage.getItem("token");
    // 뒤로가기 버튼
    const { goToErrPage } = useAuth();
    const navigate = useNavigate();
    // 카테고리 토글버튼
    const [category, setCategory] = useState(1);
    // 요일 토글버튼
    const [recur, setRecur] = useState([]);
    // 카테고리별 전체항목 [Exercise/Food]
    const [elements, setElements] = useState();
    // 카테고리가 [Exercise] 일때 세트당 횟수값 변경
    const [reps, setReps] = useState(0);
    // 카테고리가 [Exercise] 일때 세트수값 변경
    const [sets, setSets] = useState(0);
    // 카테고리가 [Food] 일때 order값 변경
    const [order, setOrder] = useState(4);
    // DropDown 1 으로 목록의 데이터로 줄 sort값만 가져온 배열
    const [sort, setSort] = useState();
    // DropDown 1 에서 선택한 데이터를 자식에서 받아오는것
    const [sortValue, setSortValue] = useState(0);
    // DropDown 2 으로 1의 sort 값을 갖고있는 items 배열
    const [sortedItems, setSortedItems] = useState();
    // DropDown 2 에서 선택한 데이터를 자식에서 받아오는것
    const [selectItem, setSelectItem] = useState(0);

    const onSelectCategory = () => {
        setCategory((prev) => (prev == 1 ? 2 : 1));
    };

    const onSelectRecur = (event, newFormats) => {
        setRecur(newFormats); // [array]형식으로 나옴 없을땐 빈배열
    };
    const onSelectOrder = (event, newOrder) => {
        setOrder(newOrder);
    };

    const getCategory = async () => {
        try {
            const res = await todoApi.getCategory(category);
            if (res.payload.id == 1) {
                setElements(res.payload.Exercises);
                setSortedItems(res.payload.Exercises);
            } else {
                setElements(res.payload.Food);
                setSortedItems(res.payload.Food);
            }
        } catch (err) {
            goToErrPage(err, () => navigate('/err'));
        }
    };

    useEffect(() => {
        getCategory();
        setOrder(category == 1 ? 4 : 1);
    }, [category]);

    useEffect(() => {
        onSetSort();
        setSortValue(0);
        setSelectItem(0);
    }, [elements, order]);

    useEffect(() => {
        onSetItem();
    }, [sortValue]);

    const onSetSort = () => {
        const uniqueSorts = [...new Set(elements?.map((item) => item.sort))];
        setSort(uniqueSorts);
    };

    const onSetItem = () => {
        if (sortValue ==0) {
            setSortedItems(elements)
        } else {
            const sortedItem = elements?.filter((e) => e.sort === sortValue);
            setSortedItems(sortedItem);
        }
    };

    const onUploadTodoEle = async () => {
        try {
            if(selectItem) {
                const res = await todoApi.createTodoList(
                    {
                        date: localStorage.getItem("date"),
                    },
                    token
                );
                const res2 = await todoApi.createTodoEle(
                    {
                        category_id: category,
                        todo_id: selectItem,
                        order: order,
                        date: localStorage.getItem("date"),
                        todo_list_id: res.payload.id,
                        reps : reps,
                        sets : sets,
                    },
                    token
                );
                localStorage.removeItem("date");
                localStorage.removeItem("day");
                navigate("/todolist");
            } else {
                Swal.fire({
                    title: "일과를 선택해 주세요.",
                    // text: "That thing is still around?",
                    icon: "warning",
                });
            }
        } catch (err) {
            goToErrPage(err, () => navigate('/err'));
        }
    };

    return (
        <PageBox>
            <BackgroundBox style={{ width: "90%", justifyContent: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    일과 등록
                </Typography>
                <ForegroundBox
                    style={{
                        width: "335px",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "20px",
                    }}
                >
                    <Box>
                        <ToggleButtonGroup
                            color="standard"
                            value={category}
                            exclusive
                            onChange={onSelectCategory}
                            // aria-label="Category"
                            fullWidth
                        >
                            <ToggleButton value={1}>운동</ToggleButton>
                            <ToggleButton value={2}>식단</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    {category == 1 ? (
                        <Grid container spacing={0.5}>
                            <Grid item xs={6}>
                                <NumberInput count={reps} setCount={setReps}>
                                    횟수
                                </NumberInput>
                            </Grid>
                            <Grid item xs={6}>
                                <NumberInput count={sets} setCount={setSets}>
                                    세트
                                </NumberInput>
                            </Grid>
                        </Grid>
                    ) : (
                        <Box sx={{ marginTop: "10px" }}>
                            <ToggleButtonGroup
                                color="standard"
                                value={order}
                                exclusive
                                onChange={onSelectOrder}
                                aria-label="order"
                                fullWidth
                            >
                                <ToggleButton value={1}>아침</ToggleButton>
                                <ToggleButton value={2}>점심</ToggleButton>
                                <ToggleButton value={3}>저녁</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    )}
                    <Box sx={{ marginTop: "10px" }}>
                        <DropDownForm
                            ele={sort}
                            setItem={setSortValue}
                            item={sortValue}
                        />
                    </Box>
                    <Box sx={{ marginTop: "10px" }}>
                        <DropDownForm
                            ele={sortedItems}
                            setItem={setSelectItem}
                            item={selectItem}
                        />
                    </Box>
                    <Grid container spacing={1} sx={{ marginTop: "10px" }}>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="warning"
                                fullWidth
                                onClick={() => {
                                    navigate("/todolist");
                                }}
                            >
                                돌아가기
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={() => onUploadTodoEle()}
                            >
                                일과 등록
                            </Button>
                        </Grid>
                    </Grid>
                </ForegroundBox>
            </BackgroundBox>
        </PageBox>
    );
}
export default TodoForm;