import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export const NotFound = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: "primary",
            }}
        >
            <Typography variant="h1" style={{color: 'black'}}>
                404
            </Typography>
            <Typography variant="h6" style={{color: 'black', margin: "10px"}}>
                The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" href={'/'}>Back Home</Button>
        </Box>
    );
}