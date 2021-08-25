import axios from 'axios';

export const login = async (user) => {
  try {
    const response = await axios.post('/user/login', user);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const register = async (user) => {
  try {
    const response = await axios.post('/user/register', user);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    const response = await axios.get('/user/logout');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const isAuthenticated = async () => {
  try {
    const response = await axios.get('/user/authenticated');
    if (response.status !== 401) {
      return response.data;
    } else {
      return { isAuthenticated: false, user: { username: '', role: '' } };
    }
  } catch (err) {
    console.log(err);
  }
};
