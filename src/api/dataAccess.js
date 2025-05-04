import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const fetchEmployeeIds = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/data/employee-ids`, {
      params: { date }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employee IDs:', error);
    throw error;
  }
};

export const fetchLicenseDetails = async (date, empId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/data/license-details`, {
      params: { date, empId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching license details:', error);
    throw error;
  }
};

export const fetchAppointmentDetails = async (date, empId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/data/appointment-details`, {
      params: { date, empId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment details:', error);
    throw error;
  }
};
