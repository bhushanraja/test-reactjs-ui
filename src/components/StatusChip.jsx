import React from 'react';
import { Chip } from '@mui/material';
import { CheckCircle, Error, HourglassEmpty } from '@mui/icons-material';

const StatusChip = ({ status }) => {
  let icon;
  let color;
  
  switch(status.toLowerCase()) {
    case 'complete':
      icon = <CheckCircle />;
      color = 'success';
      break;
    case 'failed':
      icon = <Error />;
      color = 'error';
      break;
    default:
      icon = <HourglassEmpty />;
      color = 'warning';
  }
  
  return (
    <Chip
      icon={icon}
      label={status}
      color={color}
      variant="outlined"
    />
  );
};

export default StatusChip;
