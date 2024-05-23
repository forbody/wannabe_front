import { Checkbox, Grid, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { orange, red } from "@mui/material/colors";
import { useState } from "react";
import { todoApi } from "../../api/services/TodoList";
import { useAuth } from "../../hooks/useAuth";

const TodoEle = ({ e, setIsAchieve }) => {
    const { loginUser } = useAuth();
    const onAchieveELe = () => {
        setAchieve();
        setIsAchieve(prev => !prev)
    };

    const setAchieve = async () => {
        try {
            await todoApi.updateEleAchieve(e.id,loginUser);
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    const onModifyELe = () => {
        console.log(1); // 하...이부분 어떻게만들어야하나~~~
    };
    const onDeleteELe = async () => {
        try {
            await todoApi.deleteTodoEle(e.id, loginUser);
            setIsAchieve((prev) => !prev);
        } catch (err) {
            console.error("Error: ", err);
        }
        
    };

    return (
        <>
            <Grid container spacing={0} alignItems={"center"}>
                    <Grid item xs={2}>
                    <Checkbox
                        color="success"
                        checked={e.achieve}
                        onClick={() => onAchieveELe()}
                    />
                    </Grid>
                    <Grid item xs={8}>
                        {e.category_id == 1
                            ? e.Exercises[0]?.name
                            : e.Food[0]?.name}
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