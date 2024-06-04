import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const Feedback = () => {
    const [errorDetails, setErrorDetails] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/report-error', { errorDetails });
            setFeedback(response.data.message);
        } catch (error) {
            setFeedback('Error submitting details. Please try again later.');
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
