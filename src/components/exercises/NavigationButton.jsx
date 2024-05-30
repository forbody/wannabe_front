import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function FloatingActionButtons() {
    return (
        <Box sx={{ '& > :not(style)': { m: 1 }}}>
        <Fab size='small' >
            <NavigationIcon  />
        </Fab>
        </Box>
    );
}