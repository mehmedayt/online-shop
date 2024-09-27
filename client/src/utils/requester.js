const BASE_URL = import.meta.env.VITE_API_URL; 

const request = async (url, method = 'GET', data = null, headers = {}) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
};

export const getRequest = (url, headers = {}) => request(url, 'GET', null, headers);
