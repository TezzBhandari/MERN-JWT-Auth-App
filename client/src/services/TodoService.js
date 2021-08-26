import axios from 'axios';

const domain = 'http://localhost:3001';

export const getTodos = async () => {
  try {
    const response = await axios.get(`${domain}/todos`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    if (err.response.status === 401) {
      return {
        success: false,
        message: { isError: true, msgBody: 'You are not Authorized' },
        response: err.response,
      };
    } else {
      return {
        success: false,
        message: { isError: true, msgBody: 'Internal Server Error. Try Again' },
        response: err.response,
      };
    }
  }
};

export const postTodo = async (todo) => {
  try {
    const response = await axios.post(`${domain}/todos`, todo, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    if (err.response.status === 401) {
      return {
        success: false,
        message: { isError: true, msgBody: 'You are not Authorized' },
        response: err.response,
      };
    } else {
      return {
        success: false,
        message: { isError: true, msgBody: 'Internal Server Error. Try Again' },
        response: err.response,
      };
    }
  }
};
