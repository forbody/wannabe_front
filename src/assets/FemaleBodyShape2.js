import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Link } from '@mui/material';

const femalebodyshape = {
    'standard': '표준형',
    'small_inverted_triangle': '작은 역삼각형',
    'large_rectangle': '큰 삼각형',
    'inverted_triangle': '역삼각형',
    'rectangle': '사각체형'
};

const CelebProfile = ({ name, photo, socialMedia, height, weight, bodyType, workoutRoutine, diet }) => {
    return (
        <Card style={{ maxWidth: 600, margin: 'auto', marginTop: 20 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar src={photo} alt={name} style={{ width: 100, height: 100 }} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant="h5">{name}</Typography>
                                <Typography variant="body1">
                                    <strong>키:</strong> {height} cm
                                </Typography>
                                <Typography variant="body1">
                                    <strong>몸무게:</strong> {weight} kg
                                </Typography>
                                <Typography variant="body1">
                                    <strong>체형:</strong> {bodyTypes[bodyType]}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>운동루틴:</strong> {workoutRoutine}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>식단:</strong> {diet}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>SNS:</strong> <Link href={socialMedia} target="_blank">{socialMedia}</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CelebProfile;