const API_BASE_URL = 'https://closet-recruiting-api.azurewebsites.net/api';

// Note: This API doesn't support pagination parameters
// We implement client-side pagination for infinite scroll demonstration
export const fetchContents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/data`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching contents:', error);
    throw error;
  }
};