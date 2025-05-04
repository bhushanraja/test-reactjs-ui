import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Tabs, Tab, Button } from '@mui/material';
import { fetchLicenseDetails, fetchAppointmentDetails } from '../api/dataAccess';
import Loading from '../components/Loading';
import Licenses from '../components/Licenses';
import Appointments from '../components/Appointments';

const EmployeeDetails = () => {
  const { empId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [licenseData, setLicenseData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');

  useEffect(() => {
    if (date) {
      fetchEmployeeData();
    }
  }, [date, empId]);

  const fetchEmployeeData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [licenseDetails, appointmentDetails] = await Promise.all([
        fetchLicenseDetails(date, empId),
        fetchAppointmentDetails(date, empId)
      ]);
      
      setLicenseData(licenseDetails);
      setAppointmentData(appointmentDetails);
    } catch (err) {
      setError('Failed to fetch employee details. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleBack = () => {
    navigate(`/access/employees?date=${date}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        onClick={handleBack}
        sx={{ mb: 2 }}
      >
        Back to Employee List
      </Button>
      
      <Typography variant="h4" gutterBottom>
        Employee Details: {empId}
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom>
        Date: {date} | User: {licenseData?.user || appointmentData?.user || 'N/A'}
      </Typography>
      
      {isLoading && <Loading message="Loading employee details..." />}
      
      {error && !isLoading && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      
      {!isLoading && !error && (licenseData || appointmentData) && (
        <Paper sx={{ mt: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="License Details" />
            <Tab label="Appointment Details" />
          </Tabs>
          
          <Box sx={{ p: 3 }}>
            {activeTab === 0 && (
              <Licenses licenses={licenseData?.licenses} />
            )}
            
            {activeTab === 1 && (
              <Appointments appointments={appointmentData?.appointments} />
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default EmployeeDetails;
