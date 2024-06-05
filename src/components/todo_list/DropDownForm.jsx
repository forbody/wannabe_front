import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect } from "react";


const DropDownForm = ({ ele,item,setItem }) => {
    const [elements, setElements] = useState();
    const handleChange = (event) => {
        setItem(event.target.value);
    };
    useEffect(() => {
        setElements(ele);
    }, [ele]);

    return (
        <Select
            onChange={(e) =>handleChange(e)}
            fullWidth
            value={item}
            
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
    );
};

export default DropDownForm;
