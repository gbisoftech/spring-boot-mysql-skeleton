import axios from 'axios';

// Create a flag to track if we've already gotten the CSRF token
let csrfTokenInitialized = false;

// Get CSRF cookie (if using Laravel Sanctum with SPA)
// Important: We use the direct axios import here, not our api instance that has the /api baseURL
const getCsrfToken = async () => {
  try {
    // Only get token if not already initialized
    if (!csrfTokenInitialized) {
      // Direct axios call without the /api prefix
      await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
      csrfTokenInitialized = true;
      console.log('CSRF token initialized');
    }
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    // Reset the flag on error so we can try again
    csrfTokenInitialized = false;
  }
};

// Initialize CSRF protection before creating the API instance
// getCsrfToken();

// Configure axios with base URL and credentials
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    // If token exists, add it to the request header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle known error codes
    if (error.response) {
      const { status, config } = error.response;

      // If the error is due to CSRF token mismatch (419) or authentication (401)
      if (status === 419) {
        // Refresh CSRF token and retry the request
        csrfTokenInitialized = false;
        // Use direct axios instance for CSRF token request
        //await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        csrfTokenInitialized = true;
        return api(config);
      } else if (status === 401) {
        console.log('Unauthorized access. Redirecting to login page...');

        // Clear any tokens or user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to auth page
        window.location.href = '/auth';
      }

      // Log specific error code for debugging
      console.error(`API Error (${status}):`, error.response.data);
    } else {
      console.error('API Error (no response):', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
