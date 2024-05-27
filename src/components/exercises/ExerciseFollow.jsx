import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import { useAuth } from "../../hooks/useAuth";

const ExerciseFollow = ({favExercise}) => {

    return (
        <Box>
            <Box key={favExercise.id} sx={{ 
                    textAlign: 'center', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center'  }}>
                <Typography variant="h6">{favExercise.name}</Typography>
                <img 
                    src={`http://localhost:8000${favExercise.img}`}
                    alt={favExercise.name}
                    style={{
                        display: 'block',
                        width: '200px',
                        height: 'auto', // 비율을 유지하면서 높이 자동 조정
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        marginTop: '10px' // 텍스트와 이미지 사이의 간격
                    }}
                />
            </Box>
        </Box>
    );
}

export default ExerciseFollow