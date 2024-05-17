import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Grid, OutlinedInput } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const dummy_data = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const DropDownForm = () => {
    const theme = useTheme();
    const [elements, setElements] = useState(dummy_data);

    const [name, setName] = useState("");
    const handleChange = (event) => {
        setName(event.target.value);
    };
    return (
        <FormControl fullWidth>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={name}
                onChange={handleChange}
            >
                {elements.map(e =>(
                    <MenuItem value={e}>
                        {e}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default DropDownForm;
