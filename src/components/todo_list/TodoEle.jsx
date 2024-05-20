import { Checkbox, Grid, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { orange, red } from "@mui/material/colors";
import { useState } from "react";
import { todoApi } from "../../api/services/TodoList";

const TodoEle = ({ e, setIsAchieve }) => {
    const [istrue, setIstrue] = useState(e.achieve);
    const onAchieveELe = () => {
        setAchieve();
        setIsAchieve(prev => !prev)
        setIstrue(!istrue);
    };

    const setAchieve = async () => {
        try {
            await todoApi.updateEleAchieve(e.id);
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    const onModifyELe = () => {
        console.log(1);
    };
    const onDeleteELe = () => {
        console.log(1);
    };

    return (
        <>
            <Grid container spacing={0} alignItems={"center"}>
                <Grid item xs={2}>
                    <Checkbox
                        color="success"
                        checked={istrue}
                        onClick={() => onAchieveELe()}
                    />
                </Grid>
                <Grid item xs={8}>
                    {e.Food[0].name}
                </Grid>
                <Grid
                    item
                    xs={1}
                    sx={{ textAlign: "center" }}
                    onClick={() => onModifyELe()}
                >
                    <IconButton sx={{ margin: "0", padding: "0" }}>
                        <EditIcon
                            fontSize="small"
                            sx={{ color: orange[400] }}
                        />
                    </IconButton>
                </Grid>
                <Grid
                    item
                    xs={1}
                    sx={{ textAlign: "center" }}
                    onClick={() => onDeleteELe()}
                >
                    <IconButton sx={{ margin: "0", padding: "0" }}>
                        <DeleteIcon fontSize="small" sx={{ color: red[400] }} />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
};

export default TodoEle;