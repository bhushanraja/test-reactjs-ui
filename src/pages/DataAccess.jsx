import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const DataAccess = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Data Access
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '400px' }}>
        <Button 
          variant="contained" 
          component={Link}
          to="/access/employees"
          size="large"
        >
          View Employee IDs
        </Button>
        
        <Typography variant="body1" sx={{ mt: 2 }}>
          Use the above button to view all employee IDs (agents) from the processed data.
        </Typography>
      </Box>
    </Box>
  );
};

export default DataAccess;
