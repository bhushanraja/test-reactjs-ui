import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { startTransformJob, checkJobStatus } from '../api/dataProcess';
import Loading from '../components/Loading';
import StatusChip from '../components/StatusChip';

const DataProcess = () => {
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [pollingJobs, setPollingJobs] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) {
      setError('Please enter a date in YYYYMMDD format');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await startTransformJob(date);
      setJobs([response, ...jobs]);
      startPollingJobStatus(response.jobId);
    } catch (err) {
      setError('Failed to start transform job. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const startPollingJobStatus = (jobId) => {
    if (pollingJobs[jobId]) return;
    
    setPollingJobs(prev => ({ ...prev, [jobId]: true }));
    
    const intervalId = setInterval(async () => {
      try {
        const status = await checkJobStatus(jobId);
        
        setJobs(prevJobs => 
          prevJobs.map(job => 
            job.jobId === jobId ? { ...job, status: status.status } : job
          )
        );
        
        if (status.status.toLowerCase() === 'complete' || status.status.toLowerCase() === 'failed') {
          clearInterval(intervalId);
          setPollingJobs(prev => {
            const newPolling = { ...prev };
            delete newPolling[jobId];
            return newPolling;
          });
        }
      } catch (err) {
        console.error(`Error polling job ${jobId}:`, err);
        clearInterval(intervalId);
      }
    }, 2000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Data Processing
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Start New Transform Job
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Date (YYYYMMDD)"
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g., 20250306"
            error={!!error}
            helperText={error}
          />
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isLoading}
          >
            {isLoading ? 'Starting...' : 'Start Job'}
          </Button>
        </Box>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Job History
        </Typography>
        
        {jobs.length === 0 ? (
          <Typography>No jobs have been submitted yet.</Typography>
        ) : (
          <List>
            {jobs.map((job, index) => (
              <React.Fragment key={job.jobId}>
                <ListItem>
                  <ListItemText
                    primary={`Job ID: ${job.jobId}`}
                    secondary={`Date: ${job.jobId.split('-')[0]}`}
                  />
                  <StatusChip status={job.status} />
                </ListItem>
                {index < jobs.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default DataProcess;
