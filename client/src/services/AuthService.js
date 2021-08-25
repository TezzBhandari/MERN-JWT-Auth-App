import axios from 'axios';

const domain = 'http://localhost:3001';
export const login = async (user) => {
  try {
    const response = await axios.post(`${domain}/user/login`, user);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const register = async (user) => {
  try {
    const response = await axios.post(`${domain}/user/register`, user);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${domain}/user/logout`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const isAuthenticated = async () => {
  try {
    const response = await axios.get(`${domain}/user/authenticate`);
    return response.data;
  } catch (err) {
    if (err.response.status === 401) {
      return { isAuthenticated: false, user: { username: '', role: '' } };
    } else {
      console.log(err.response);
    }
  }
};
