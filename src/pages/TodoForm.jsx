import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { BackgroundBox, ForegroundBox } from '../components/styled_comp/StyledDiv';
import DropDownForm from "../components/todo_list/DropDownForm";
import { useState } from 'react';


const TodoForm = () => {
    const [alignment, setAlignment] = useState();

    const handleChange = (event, newAlignment) => {
        console.log(newAlignment);
        setAlignment(newAlignment);
    };
    return (
        <Box
            height='100vh'
            display='flex'
            flexDirection='column'
            alignItems='center'
        >
            <h1>Todo Form</h1>
            <BackgroundBox style={{width : "90%"}}>
                <ForegroundBox style={{ width: "335px" , flexDirection: 'column', justifyContent:'center'}}>
                    <Box>
                        <ToggleButtonGroup
                            color="secondary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Category"
                            fullWidth
                        >
                            <ToggleButton value="1">운동</ToggleButton>
                            <ToggleButton value="2">식단</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box>
                        <DropDownForm />
                    </Box>
                </ForegroundBox>
            </BackgroundBox>
        </Box>
    );
}
export default TodoForm;