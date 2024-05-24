import { Box, Button, Grid, IconButton } from "@mui/material";
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

    return (
        <ForegroundBox
            style={{
                width: "300px",
                flexDirection: "column",
                marginTop: "10px",
            }}
        >
            <Grid
                container
                spacing={0}
                alignItems={"center"}
                style={{ fontSize: "20px", fontWeight: "bold" }}
            >
                <Grid item xs={8}>
                    {children}
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "center" }}>
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
                    {breakfast.length?
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
                            <TodoEle e={e} key={e.id} setIsAchieve={setIsAchieve} />
                        ))}
                    </>
                    :
                    false
                    }
                    {lunch.length ?
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
                            <TodoEle e={e} key={e.id} setIsAchieve={setIsAchieve} />
                        ))}
                        
                    </>
                    :
                    false
                    }
                    {dinner.length?
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
                            <TodoEle e={e} key={e.id} setIsAchieve={setIsAchieve} />
                        ))}
                    </>
                    :
                    false
                    }
                </>
            ) : (
                false
            )}
        </ForegroundBox>
    );
};

export default TodoBoxFood;
