import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { fetchEmployeeIds } from '../api/dataAccess';
import Loading from '../components/Loading';

const EmployeeList = () => {
  const [date, setDate] = useState('');
  const [employees, setEmployees] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dateParam = queryParams.get('date');
    
    if (dateParam) {
      setDate(dateParam);
      fetchData(dateParam);
    }
  }, [location.search]);

  const fetchData = async (date) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchEmployeeIds(date);
      setEmployees(data);
    } catch (err) {
      setError('Failed to fetch employee data. Please check the date and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/access/employees?date=${date}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employee IDs
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
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
            {isLoading ? 'Loading...' : 'Fetch Employees'}
          </Button>
        </Box>
      </Paper>
      
      {isLoading && <Loading message="Fetching employee data..." />}
      
      {error && !isLoading && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      
      {employees && !isLoading && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Results ({employees.totalEmpIds} employees)
          </Typography>
          
          <List>
            {employees.data.map((empId, index) => (
              <React.Fragment key={empId}>
                <ListItem 
                  button 
                  onClick={() => navigate(`/access/employees/${empId}?date=${date}`)}
                >
                  <ListItemText primary={empId} />
                </ListItem>
                {index < employees.data.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default EmployeeList;
