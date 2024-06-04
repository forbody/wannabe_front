import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { errorApi } from '../api/services/error';


const Feedback = () => {
    const token = localStorage.getItem("token");
    const [errorDetails, setErrorDetails] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await errorApi.postErr({errorDetails}, token)
            if(response.code ===200) {
                setFeedback(response.data.message);
            } else {
                setFeedback('실패했습니다!.');
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <Card>
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
    );
};

export default Feedback;
