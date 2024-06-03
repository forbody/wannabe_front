import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// 임시 데이터, 실제 데이터로 대체할 수 있습니다.
const celebrityBodyTypes = [
    { name: '셀럽 1', bodyType: '표준형', description: '기본 체형 설명' },
    { name: '셀럽 2', bodyType: '작은 역삼각형', description: '작은 역삼각형 체형 설명' },
  // 추가 데이터...
];

const CelebrityBodyType = () => {
    return (
    <Grid container spacing={3}>
        {celebrityBodyTypes.map((celebrity, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                {celebrity.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                체형: {celebrity.bodyType}
                </Typography>
                <Typography variant="body2">
                {celebrity.description}
                </Typography>
            </CardContent>
            </Card>
        </Grid>
        ))}
    </Grid>
    );
};

export default CelebrityBodyType;
