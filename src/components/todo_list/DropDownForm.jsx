import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Grid, OutlinedInput } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";


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



const DropDownForm = ({ ele, value, setValue }) => {
    const theme = useTheme();
    const [elements, setElements] = useState();
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    useEffect(() => {
        setElements(ele);
    }, [ele]);
    return (
        <FormControl fullWidth>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={value}
                onChange={handleChange}
            >
                {elements?.map((e) =>
                    typeof e === "object" ? (
                        <MenuItem key={e.id} value={e.id}>
                            {e.name}
                        </MenuItem>
                    ) : (
                        <MenuItem key={e} value={e}>
                            {e}
                        </MenuItem>
                    )
                )}
            </Select>
        </FormControl>
    );
};

export default DropDownForm;
