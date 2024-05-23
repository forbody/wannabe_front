import { Box, Grid, IconButton } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { useAuth } from "../../hooks/useAuth";
import { todoApi } from "../../api/services/TodoList";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect, useState } from "react";

const ShareEleBox = ({children, elements}) => {
    const [isTrue, setIsTrue] = useState(false);
    const {loginUser} = useAuth()
    const [totalCal, setTotalCal] = useState();
    useEffect(() => {
        setTotalCal(elements.reduce((acc, e) => acc + e.Food[0]?.calory, 0));    
    },[])
    
    

    const onIsTrue = () => {
        setIsTrue(!isTrue);
    };

    const onSetRecommendFood = async () => {
        try {
            const date = localStorage.getItem("date");
            const res = await todoApi.createTodoList({ date }, loginUser);
            const todo_list_id = res.payload?.id;
            // const res2 = await todoApi.shareTodoEle(
            //     {
            //         date,
            //         todo_list_id,
            //         elements,
            //         order,
            //     },
            //     loginUser
            // );
            // arr = [];
        } catch (err) {
            console.error("Error: ", err);
        }
    };
    return (
        <ForegroundBox>
            <Grid container sx={{ alignItems: "center" }}>
                <Grid item xs={9}>
                    {children}
                </Grid>
                <Grid item xs={1.5}>
                    <IconButton
                        sx={{ margin: "0", padding: "0" }}
                        onClick={() => onSetRecommendFood()}
                    >
                        <FileUploadIcon
                            sx={{ color: cyan[400] }}
                            fontSize="medium"
                        />
                    </IconButton>
                </Grid>
                <Grid item xs={1.5} onClick={() => onIsTrue()}>
                    <IconButton
                        sx={{ margin: "0", padding: "0", textAlign: "center" }}
                    >
                        {isTrue ? (
                            <ExpandLessIcon fontSize="medium" />
                        ) : (
                            <ExpandMoreIcon fontSize="medium" />
                        )}
                    </IconButton>
                </Grid>
                {isTrue &&
                    elements.map((e) =>
                        e.category_id == 1 ? (
                            <Box
                                sx={{
                                    width: "90%",
                                    padding: "0px 10px",
                                    fontSize: "14px",
                                }}
                                key={e.id}
                            >
                                {e.Exercises[0].name}
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    width: "90%",
                                    padding: "0px 10px",
                                    fontSize: "14px",
                                }}
                                key={e.id}
                            >
                                {e.Food[0].name}
                            </Box>
                        )
                    )}
            </Grid>
        </ForegroundBox>
    );
}

export default ShareEleBox;