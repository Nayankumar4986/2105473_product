
import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144/test';

export const registerCompany = async (companyName, ownerName, rollNo, ownerEmail, accessCode) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      companyName,
      ownerName,
      rollNo,
      ownerEmail,
      accessCode
    });
    return response.data;
  } catch (error) {
    console.error('Error registering company:', error);
    throw error;
  }
};

export const getAuthorizationToken = async (companyName, clientID, clientSecret, ownerName, ownerEmail, rollNo) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, {
      companyName,
      clientID,
      clientSecret,
      ownerName,
      ownerEmail,
      rollNo
    });
    return response.data;
  } catch (error) {
    console.error('Error getting authorization token:', error);
    throw error;
  }
};

export const getTopProducts = async (companyName, category, top, minPrice, maxPrice) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/companies/${companyName}/categories/${category}/products`, {
      params: {
        top,
        minPrice,
        maxPrice
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top products:', error);
    throw error;
  }
};
