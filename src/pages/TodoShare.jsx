import { Box, Button, TextField } from "@mui/material";
import { BackgroundBox, ForegroundBox, TitleBox } from "../components/styled_comp/StyledDiv";

const TodoShare = () => {
    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <h1>TodoShare</h1>
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
                        <TextField
                            multiline
                            rows={6}
                            placeholder="추천 팁을 입력해주세요"
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ marginTop: "10px" }}>
                        <Button variant="contained" color="secondary" fullWidth>
                            공유하기
                        </Button>
                    </Box>
                </ForegroundBox>
            </BackgroundBox>
        </Box>
    );
}

export default TodoShare;