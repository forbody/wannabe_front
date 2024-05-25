import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const NumberInput = ({ children, count , setCount}) => {
    const onSetCount = (e) => {
      setCount(e.target.value);
    }
    return (
        <Box sx={{ marginTop: "10px" }}>
            <TextField
                placeholder={children}
                variant="outlined"
                type="number"
                onChange={(e) => onSetCount(e)}
            />
        </Box>
    );
};

export default NumberInput;
