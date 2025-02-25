import axios from 'axios';

export const loginUser = async (credentials) => {
  const response = await axios.post('/api/login', credentials);
  return response.data;
};

export const verifyToken = async (token) => {
  try {
    const response = await axios.post('/api/verify-token', { token });
    return response.data.user;
  } catch (error) {
    return null;
  }
};
