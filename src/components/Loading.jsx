import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
        >
        <CircularProgress />
        <Box mt={2}>
        {/* <img src="../assets/loading.png" alt="wannabe_loading..." /> */}
        {/* 이미지 경로*/}
        </Box>
        </Box>
    );
};

export default Loading;

