import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, isLoading, error, login, register, clearError } = useAuth();

  // Clear errors when switching between login and signup
  // This useEffect must be before any conditional returns
  useEffect(() => {
    clearError();
  }, [isLogin, clearError]);

  // Redirect if user is already authenticated
  if (user) {
    return <Navigate to="/users" replace />;
  }

  const handleLogin = async (values: { email: string; password: string }) => {
    await login(values.email, values.password);
  };

  const handleRegister = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    await register(
      values.name,
      values.email,
      values.password,
      values.confirmPassword
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      {/* Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Panel - Branding */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 md:p-12 md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">Kariera Group</h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8">
              Explore your interests, meet new friends & expand your horizons
            </p>

            {/* Features or benefits */}
            <div className="hidden md:block space-y-4 mt-12">
              <div className="flex items-center text-white">
                <div className="bg-blue-400 bg-opacity-30 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Connect with professionals in your field</p>
              </div>
              <div className="flex items-center text-white">
                <div className="bg-blue-400 bg-opacity-30 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Discover new opportunities</p>
              </div>
              <div className="flex items-center text-white">
                <div className="bg-blue-400 bg-opacity-30 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Grow your professional network</p>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="mt-12">
            <a
              href="/"
              className="inline-flex items-center text-white hover:text-blue-200 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Home
            </a>
          </div>
        </div>

        {/* Right Panel - Auth Forms */}
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          {/* Form Container */}
          <div className="max-w-md mx-auto w-full">
            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}

            {isLogin ? (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>
                <LoginForm
                  onSubmit={handleLogin}
                  setIsLogin={setIsLogin}
                  isLoading={isLoading}
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
                <SignUpForm
                  onSubmit={handleRegister}
                  setIsLogin={setIsLogin}
                  isLoading={isLoading}
                />
              </>
            )}

            {/* Form toggle link */}
            <div className="mt-6 text-center">
              {isLogin ? (
                <p className="text-gray-600">
                  Don't have an account?
                  <button
                    onClick={() => setIsLogin(false)}
                    className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sign up now
                  </button>
                </p>
              ) : (
                <p className="text-gray-600">
                  Already have an account?
                  <button
                    onClick={() => setIsLogin(true)}
                    className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;