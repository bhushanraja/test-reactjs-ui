import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Licenses = ({ licenses }) => {
  if (!licenses || licenses.length === 0) {
    return <Typography variant="body1">No license information available.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>License Number</TableCell>
            <TableCell>License Name</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Expiration Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {licenses.map((license, index) => (
            <TableRow key={index}>
              <TableCell>{license.licenseNumber}</TableCell>
              <TableCell>{license.licenseName}</TableCell>
              <TableCell>{license.state}</TableCell>
              <TableCell>{license.status}</TableCell>
              <TableCell>{license.licenseExpirationDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Licenses;
