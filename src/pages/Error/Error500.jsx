import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Card, CardContent } from '@mui/material';
import { BackgroundBox, ForegroundBox } from "../../components/styled_comp/StyledDiv";
import { useNavigate } from 'react-router-dom';
import { errorApi } from '../../api/services/error';

const Error500 = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [errorDetails, setErrorDetails] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await errorApi.postErr({ errorDetails }, token)
            if (response.code === 200) {
                setFeedback(response.data.message);
            } else {
                setFeedback('실패했습니다!.');
            }
        } catch (error) {
            console.error(error);
            setFeedback('에러가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <Box
            width='90%'
            height='100vh'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            style={{
                padding: '0 60px',
            }}
        >
            <Typography variant="h1" color="error">
                500
            </Typography>
            <Typography variant="h6" color="textSecondary">
                서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                홈으로
            </Button>

            <Card style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        오류 세부사항 제출
                    </Typography>
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
                        <Button variant="contained" color="primary" type="submit">
                            제출
                        </Button>
                    </form>
                    {feedback && (
                        <Typography variant="body1" color="textSecondary" component="p">
                            {feedback}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

export default Error500;
