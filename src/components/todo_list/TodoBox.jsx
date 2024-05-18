import { Box, Button, Grid, IconButton } from "@mui/material";
import { BackgroundBox, ForegroundBox } from "../styled_comp/StyledDiv";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useEffect, useState } from "react";
import TodoEle from "./TodoEle";

const TodoBox = ({food}) => {
    const [isTrue, setIsTrue] = useState(false);
    
    const onIsTrue = () => {
        setIsTrue(!isTrue)
    }
    const total = food?.length;
    const achieve = food?.filter((e) => e.achieve === true).length;
    return (
        <ForegroundBox
            style={{
                backgroundColor: "#ffffff99",
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
                    식단
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
            {/* 여기서 엘리먼트 반복추가하면될듯 */}
            {isTrue ? <TodoEle food={food} /> : false}
        </ForegroundBox>
    );
}

export default TodoBox;
