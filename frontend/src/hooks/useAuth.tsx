import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "../utils/axios";
import { useToast } from "../components/ui/Alert";

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  [key: string]: any;
}

// Define the auth context shape
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Create the auth context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        // First try to get user from localStorage
        const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        // Check if we have both token and user data
        if (userData && token) {
          // Parse and use user data from localStorage
          const parsedUser = JSON.parse(userData);

          // Add a default avatar if missing
          if (!parsedUser.avatar) {
            parsedUser.avatar = "https://via.placeholder.com/150";
          }

          setUser(parsedUser);

          // Verify token is still valid by making an API request
          try {
            const response = await api.get("/user");

            // Update user data with fresh data from API
            if (response.data && response.data.user) {
              const freshUser = response.data.user;

              // Add default avatar if missing
              if (!freshUser.avatar) {
                freshUser.avatar = "https://via.placeholder.com/150";
              }

              // Update localStorage and state with fresh data
              localStorage.setItem("user", JSON.stringify(freshUser));
              setUser(freshUser);
            }
          } catch (apiError) {
            console.error("Token validation failed:", apiError);
            // If API request fails, clear stored data and set user to null
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
          }
        } else {
          // If no token or no user data, clear everything to be safe
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      } catch (err: any) {
        console.error("Error loading user data:", err);
        // Clear any stored tokens if we fail to load the user
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Check for and display any pending toast messages
    const checkForToastMessages = () => {
      const toastMessage = localStorage.getItem("toast_message");
      const toastSeverity =
        (localStorage.getItem("toast_severity") as
          | "success"
          | "error"
          | "warning"
          | "info") || "success";
      const toastTimestamp = localStorage.getItem("toast_timestamp");

      if (toastMessage && toastTimestamp) {
        // Only show toast if it was created less than 10 seconds ago
        const now = Date.now();
        const timestamp = parseInt(toastTimestamp, 10);

        if (now - timestamp < 10000) {
          // Show the toast
          showToast(toastMessage, toastSeverity);
        }

        // Clear the toast data from localStorage
        localStorage.removeItem("toast_message");
        localStorage.removeItem("toast_severity");
        localStorage.removeItem("toast_timestamp");
      }
    };

    // Load user and check for toast messages
    loadUser();
    checkForToastMessages();
  }, [showToast]);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      console.log(response);

      // Save the token to localStorage for future API calls
      localStorage.setItem("token", response.data.token);

      // Save user data
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Set user state
      setUser(response.data.user);

      // Store toast message for next page
      localStorage.setItem(
        "toast_message",
        `Welcome back, ${response.data.user.name}!`
      );
      localStorage.setItem("toast_severity", "success");
      localStorage.setItem("toast_timestamp", Date.now().toString());

      // Redirect to profile page
      window.location.href = "/users";
    } catch (err: any) {
      console.error("Login error:", err.response?.data);

      // Extract error message from response
      const responseData = err.response?.data;
      let errorMessage =
        "Login failed. Please check your credentials and try again.";

      if (responseData?.message) {
        errorMessage = responseData.message;
      } else if (responseData?.errors) {
        // Get the first error message from the errors object
        const firstErrorField = Object.keys(responseData.errors)[0];
        if (firstErrorField && responseData.errors[firstErrorField][0]) {
          errorMessage = responseData.errors[firstErrorField][0];
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/register", {
        username: name,
        email,
        password,
        // password_confirmation: passwordConfirmation,
      });
      console.log("---------response--------", response);

      // Handle successful response
      if (response.data.token) {
        // Save the token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Set user state
        setUser(response.data.user);

        // Store toast message for next page
        localStorage.setItem(
          "toast_message",
          `Account created successfully! Welcome, ${response.data.user.name}!`
        );
        localStorage.setItem("toast_severity", "success");
        localStorage.setItem("toast_timestamp", Date.now().toString());

        // Redirect to profile page
        window.location.href = "/users";
      }
    } catch (err: any) {
      console.error("Registration error:", err.response?.data);

      // Extract error message from response
      const responseData = err.response?.data;
      let errorMessage =
        "Registration failed. Please check your information and try again.";

      if (responseData?.message) {
        errorMessage = responseData.message;
      } else if (responseData?.errors) {
        // Get the first error message from the errors object
        const firstErrorField = Object.keys(responseData.errors)[0];
        if (firstErrorField && responseData.errors[firstErrorField][0]) {
          errorMessage = responseData.errors[firstErrorField][0];
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      // Call logout endpoint if user is logged in
      if (user) {
        await api.post("/logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear user data and token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Reset user state
      setUser(null);
      setIsLoading(false);

      // Show toast message
      showToast("You have been logged out successfully", "info");

      // Redirect to login page
      window.location.href = "/auth";
    }
  };

  // Clear error function
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
