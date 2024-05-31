import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { BackgroundBox, ForegroundBox, TitleBox } from "../styled_comp/StyledDiv";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useEffect, useState } from "react";
import TodoEle from "./TodoEle";
import { Launch } from "@mui/icons-material";

const TodoBoxFood = ({ element, setIsAchieve, children }) => {
    const [isTrue, setIsTrue] = useState(false);
    const [breakfast, setBreakfast] = useState();
    const [lunch, setLunch] = useState();
    const [dinner, setDinner] = useState();
    const [breakfastCal, setBreakfastCal] = useState();
    const [lunchCal, setLunchCal] = useState();
    const [dinnerCal, setDinnerCal] = useState();

    const onIsTrue = () => {
        setIsTrue(!isTrue);
    };
    
    /// 이부분 실시간 연동
    let total = element?.length;
    let achieve = element?.filter((e) => e.achieve === true).length;

    useEffect(() => {
        setBreakfast(element.filter((e) => e.order == 1));
        setLunch(element.filter((e) => e.order == 2));
        setDinner(element.filter((e) => e.order == 3));
    },[element])

    useEffect(() => {
        setBreakfastCal(breakfast?.reduce((acc, e) => acc + e.Food[0]?.calory, 0));
    },[breakfast])
    useEffect(() => {
        setLunchCal(lunch?.reduce((acc, e) => acc + e.Food[0]?.calory, 0));
    },[lunch])
    useEffect(() => {
        setDinnerCal(dinner?.reduce((acc, e) => acc + e.Food[0]?.calory, 0));
    },[dinner])

    return (
        <ForegroundBox
            style={{
                width: "100%",
                flexDirection: "column",
                marginTop: "5px",
            }}
        >
            <Grid
                container
                spacing={0}
                alignItems={"center"}
                style={{ fontSize: "20px", fontWeight: "bold" }}
            >
                <Grid item xs={6}>
                    {children}
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                    {achieve} / {total}
                </Grid>
                <Grid
                    item
                    xs={2}
                    sx={{ textAlign: "center" }}
                    onClick={() => onIsTrue()}
                >
                    <IconButton sx={{ margin: "0", padding: "0" }}>
                        {isTrue ? (
                            <ExpandLessIcon fontSize="large" />
                        ) : (
                            <ExpandMoreIcon fontSize="large" />
                        )}
                    </IconButton>
                </Grid>
            </Grid>
            {isTrue ? (
                <>
                    {breakfast?.length ? (
                        <>
                            <Box
                                sx={{
                                    borderBottom: "1px solid black",
                                    textAlign: "center",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                아침
                            </Box>
                            {breakfast?.map((e) => (
                                <TodoEle
                                    e={e}
                                    key={e.id}
                                    setIsAchieve={setIsAchieve}
                                />
                            ))}
                            <Box
                                sx={{
                                    borderTop: "1px solid black",
                                    textAlign: "right",
                                    fontSize: "16px",
                                }}
                            >
                                <Typography
                                    color="secondary"
                                    style={{
                                        marginTop: "8px",
                                    }}
                                >
                                    {breakfastCal} kcal
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        false
                    )}
                    {lunch?.length ? (
                        <>
                            <Box
                                sx={{
                                    borderBottom: "1px solid black",
                                    textAlign: "center",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                점심
                            </Box>
                            {lunch?.map((e) => (
                                <TodoEle
                                    e={e}
                                    key={e.id}
                                    setIsAchieve={setIsAchieve}
                                />
                            ))}
                            <Box
                                sx={{
                                    borderTop: "1px solid black",
                                    textAlign: "right",
                                    fontSize: "16px",
                                }}
                            >
                                <Typography
                                    color="secondary"
                                    style={{
                                        marginTop: "8px",
                                    }}
                                >
                                    {lunchCal} kcal
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        false
                    )}
                    {dinner?.length ? (
                        <>
                            <Box
                                sx={{
                                    borderBottom: "1px solid black",
                                    textAlign: "center",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                저녁
                            </Box>
                            {dinner?.map((e) => (
                                <TodoEle
                                    e={e}
                                    key={e.id}
                                    setIsAchieve={setIsAchieve}
                                />
                            ))}
                            <Box
                                sx={{
                                    borderTop: "1px solid black",
                                    textAlign: "right",
                                    fontSize: "16px",
                                }}
                            >
                                <Typography
                                    color="secondary"
                                    style={{
                                        marginTop: "8px",
                                    }}
                                >
                                    {dinnerCal} kcal
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        false
                    )}
                </>
            ) : (
                false
            )}
        </ForegroundBox>
    );
};

export default TodoBoxFood;
