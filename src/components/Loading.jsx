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
      bgcolor="#black" // 배경색을 추가하여 로딩 중임을 더 잘 나타냄
    >
        <CircularProgress
            sx={{
            color: 'primary.main', // 더 진한 색상
            width: '100px !important', // 크기를 키우기
            height: '100px !important', // 크기를 키우기
            }}
            />
      <Box mt={2} fontSize="h4.fontSize" color="White"> {/* 텍스트 크기를 키움 */}
        Loading...
        </Box>
    </Box>
    );
};

export default Loading;

