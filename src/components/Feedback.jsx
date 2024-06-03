import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const Feedback = () => {
    const [errorDetails, setErrorDetails] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 보통 서버로 오류 세부사항을 전송하거나 처리합니다.
    setFeedback('제출해 주셔서 감사합니다. 오류 세부 사항을 검토한 후 피드백을 제공하겠습니다.');
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
