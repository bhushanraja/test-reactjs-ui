import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loading = ({ message }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4}>
      <CircularProgress />
      {message && <Typography variant="body1" mt={2}>{message}</Typography>}
    </Box>
  );
};

export default Loading;
