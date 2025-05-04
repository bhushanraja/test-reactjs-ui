import React from 'react';
import { Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Agent Licensing Service
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the Agent Licensing Service application. This frontend provides access to the 
        Agent Licensing backend service that processes and serves agent licensing data.
      </Typography>
      <Typography variant="body1" paragraph>
        Use the navigation menu to access the different features:
      </Typography>
      <ul>
        <li><strong>Data Process</strong> - Start and monitor jobs to transform XML data to JSON</li>
        <li><strong>Data Access</strong> - View employee IDs and their license/appointment details</li>
      </ul>
    </Box>
  );
};

export default Home;
