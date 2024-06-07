import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { errorApi } from "../../api/services/error";
import Swal from "sweetalert2";

const ErrCard = () => {
    const [errorDetails, setErrorDetails] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await errorApi.postErr({ errorDetails });
            if (response.code === 200) {
                Swal.fire({
                    title: "오류사항이 정상적으로 등록되었습니다.",
                    // text: "That thing is still around?",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "오류사항이 등록할수 없습니다.",
                    // text: "That thing is still around?",
                    icon: "error",
                });
            }
            setErrorDetails('')
        } catch (error) {
            console.error(error);
        }
    };
    return (
            <>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="오류 세부사항"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={errorDetails}
                        onChange={(e) => setErrorDetails(e.target.value)}
                        margin="normal"
                    />
                    <Button variant="contained" color="coral" type="submit" fullWidth>
                        오류 세부사항 제출
                    </Button>
                </form>
            </>
    );
}

export default ErrCard;