import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { BackgroundBox, ForegroundBox } from '../components/styled_comp/StyledDiv';
import DropDownForm from "../components/todo_list/DropDownForm";
import { useState } from 'react';
import { blue, red } from '@mui/material/colors';

const day = ['일', '월', '화', '수']

const TodoForm = () => {
    const [alignment, setAlignment] = useState();
    const [formats, setFormats] = useState([]);

    const handleFormat = (event, newFormats) => {
        console.log(newFormats);
        setFormats(newFormats);
    };


    const handleChange = (event, newAlignment) => {
        console.log(newAlignment);
        setAlignment(newAlignment);
    };
    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <h1>Todo Form</h1>
            <BackgroundBox style={{ width: "90%" }}>
                <ForegroundBox
                    style={{
                        width: "335px",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "20px",
                    }}
                >
                    <Box>
                        <ToggleButtonGroup
                            color="standard"
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
                    <Box sx={{ marginTop: "10px" }}>
                        <DropDownForm />
                    </Box>
                    <Box sx={{ marginTop: "10px" }}>
                        <DropDownForm />
                    </Box>
                    <Box sx={{ marginTop: "10px" }}>
                        <ToggleButtonGroup
                            value={formats}
                            onChange={handleFormat}
                            fullWidth
                            sx={{ border: "none" }}
                        >
                            <ToggleButton value="1" sx={{ color: red[400]}}>일</ToggleButton>
                            <ToggleButton value="2">월</ToggleButton>
                            <ToggleButton value="3">화</ToggleButton>
                            <ToggleButton value="4">수</ToggleButton>
                            <ToggleButton value="5">목</ToggleButton>
                            <ToggleButton value="6">금</ToggleButton>
                            <ToggleButton value="7" sx={{ color: blue[400] }}>토</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box sx={{ marginTop: "10px" }}>
                        <Button variant="contained" color="secondary" fullWidth>
                            일과 등록
                        </Button>
                    </Box>
                </ForegroundBox>
            </BackgroundBox>
        </Box>
    );
}
export default TodoForm;