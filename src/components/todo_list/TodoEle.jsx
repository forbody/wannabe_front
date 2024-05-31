import { Checkbox, Grid, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import { todoApi } from "../../api/services/TodoList";

const TodoEle = ({ e, setIsAchieve }) => {
    const token = localStorage.getItem("token");
    const onAchieveELe = () => {
        setAchieve();
        setIsAchieve(prev => !prev)
    };

    const setAchieve = async () => {
        try {
            await todoApi.updateEleAchieve(e.id,token);
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    const onDeleteELe = async () => {
        try {
            await todoApi.deleteTodoEle(e.id, token);
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
                        size="small"
                    />
                </Grid>
                <Grid item xs={9}>
                    {e.category_id == 1
                        ? e.Exercises[0]?.name
                        : e.Food[0]?.name}
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
                {e.category_id == 1 ? (
                    <>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={10} fontSize="80%" color="#999">
                            {e.reps}회 {e.sets}세트
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={10} fontSize="80%" color="#999">
                            {e.Food[0]?.calory}kcal
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    );
};

export default TodoEle;