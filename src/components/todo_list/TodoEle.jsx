import { Checkbox, Grid, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { orange, red } from "@mui/material/colors";
import { useState } from "react";

const TodoEle = ({food}) => {
    const [istrue, setIstrue] = useState(false); // 초기값 설정 할 때 achieve가져와야할듯
    
    const onAchieveELe= () => {
        setIstrue(!istrue)
    }
    const onModifyELe = () => {
        console.log(1)
    }
    const onDeleteELe = () => {
        console.log(1)
    }
    console.log(food[0].Food);

    return (  
        <>
            {food.map(f => (
                <Grid container spacing={0} alignItems={'center'} key={f.id}>
                    <Grid item xs={2}>
                        <Checkbox color="success" checked={istrue} onClick={() => onAchieveELe()}/>
                    </Grid>
                    <Grid item xs={8} >요소1</Grid>
                    <Grid item xs={1} sx={{textAlign :'center'}}  onClick={()=>onModifyELe()}>
                        <IconButton sx={{margin :'0', padding : '0'}}>
                            <EditIcon fontSize="small" sx={{color:orange[400]}}/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={1} sx={{textAlign :'center'}}  onClick={()=>onDeleteELe()}>
                        <IconButton sx={{margin :'0', padding : '0'}}>
                            <DeleteIcon fontSize="small" sx={{color: red[400]}}/>
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
        </>
    );
}

export default TodoEle;