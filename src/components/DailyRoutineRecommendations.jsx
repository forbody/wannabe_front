import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const dailyRoutines = [
    { time: '06:00 AM', activity: '일어나기 및 스트레칭' },
    { time: '07:00 AM', activity: '아침 식사' },
    { time: '08:00 AM', activity: '운동' },
    { time: '09:00 AM', activity: '업무 시작' },
    { time: '12:00 PM', activity: '점심 식사' },
    { time: '01:00 PM', activity: '짧은 산책' },
    { time: '02:00 PM', activity: '업무 재개' },
    { time: '06:00 PM', activity: '업무 종료' },
    { time: '07:00 PM', activity: '저녁 식사' },
    { time: '08:00 PM', activity: '취미 활동' },
    { time: '10:00 PM', activity: '스트레칭 및 준비 잠' },
    { time: '11:00 PM', activity: '취침' },
];

const DailyRoutineRecommendations = () => {
    return (
    <Grid container spacing={3}>
        {dailyRoutines.map((routine, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                {routine.time}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                {routine.activity}
                </Typography>
            </CardContent>
            </Card>
        </Grid>
        ))}
    </Grid>
    );
};

export default DailyRoutineRecommendations;
