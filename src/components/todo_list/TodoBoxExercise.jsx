import { Box, Button, Grid, IconButton } from "@mui/material";
import { BackgroundBox, ForegroundBox } from "../styled_comp/StyledDiv";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useEffect, useState } from "react";
import TodoEle from "./TodoEle";

const TodoBoxExercise = ({ element, setIsAchieve, children }) => {
    const [isTrue, setIsTrue] = useState(false);
    const onIsTrue = () => {
        setIsTrue(!isTrue);
    };

    /// 이부분 실시간 연동
    let total = element?.length;
    let achieve = element?.filter((e) => e.achieve === true).length;

    return (
        <ForegroundBox
            style={{
                width: "100%",
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
            {isTrue && element
                ? element.map((e) => (
                    <TodoEle e={e} key={e.id} setIsAchieve={setIsAchieve} />
                ))
                : false}
        </ForegroundBox>
    );
};

export default TodoBoxExercise;
