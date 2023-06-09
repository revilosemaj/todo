'use client';
import Box from '@mui/material/Box';
import Task from './task';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'blue',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Task />
      </Box>
    </Box>
  );
}
