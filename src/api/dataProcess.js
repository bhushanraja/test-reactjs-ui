import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const startTransformJob = async (date) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/v1/process/transform-job/`, {
      date: date
    });
    return response.data;
  } catch (error) {
    console.error('Error starting transform job:', error);
    throw error;
  }
};

export const checkJobStatus = async (jobId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/process/transform-job/${jobId}/status`);
    return response.data;
  } catch (error) {
    console.error('Error checking job status:', error);
    throw error;
  }
};
