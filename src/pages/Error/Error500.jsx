import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Card, CardContent } from '@mui/material';
import { BackgroundBox, ForegroundBox, PageBox } from "../../components/styled_comp/StyledDiv";
import { useNavigate } from 'react-router-dom';
import ErrCard from '../../components/err/ErrCard';

const Error500 = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [feedback, setFeedback] = useState('');

    

    return (
        <PageBox justifyContent='center'>
            <BackgroundBox style={{ justifyContent: "center" }}>
                <ForegroundBox
                    display="flex"
                    style={{
                        width: "100%",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        500 Internal Server Error
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        관리자에게 문의부탁드립니다.
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                        GitHub - @forbody
                    </Typography>
                    <ErrCard/>
                    <Button
                        variant="contained"
                        fullWidth
                        style={{ marginTop: "12px" }}
                        onClick={() => navigate("/")}
                    >
                        홈으로
                    </Button>
                </ForegroundBox>
            </BackgroundBox>
        </PageBox>
    );
}

export default Error500;
