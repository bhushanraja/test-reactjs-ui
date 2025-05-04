import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Appointments = ({ appointments }) => {
  if (!appointments || appointments.length === 0) {
    return <Typography variant="body1">No appointment information available.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell>NAIC ID</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Active Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment, index) => (
            <TableRow key={index}>
              <TableCell>{appointment.companyName}</TableCell>
              <TableCell>{appointment.companyNAICID}</TableCell>
              <TableCell>{appointment.state}</TableCell>
              <TableCell>{appointment.status}</TableCell>
              <TableCell>{appointment.activeDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Appointments;
