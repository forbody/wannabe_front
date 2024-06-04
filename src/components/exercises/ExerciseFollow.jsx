import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, styled } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import ExerciseModal from "./ExerciseModal";

const ExerciseFollow = ({favExercise}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Box>
                <Box key={favExercise.id} sx={{ 
                        textAlign: 'center', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginTop: '5px'
                        }}>
                    <Typography variant="h6"  >{favExercise.name}</Typography>
                    <ExerImg 
                        src={`http://localhost:8000${favExercise.img}`}
                        alt={favExercise.name}
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    />
                </Box>
            </Box>
            <ExerciseModal exercise={favExercise} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>

    );
}
const ExerImg = styled(`img`)({
        'display': 'block',
        'width': '300px',
        'height': '200px',
        'cursor': 'pointer',
        'borderRadius': '8px',
        'boxShadow': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'marginTop': '10px',
        '&:hover' : {
            boxShadow: '0 0 3px 3px rgba(0, 0, 0, 0.3)'
        }
    })


export default ExerciseFollow