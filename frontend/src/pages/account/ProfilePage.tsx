import React, { useState } from 'react';
import ProfileDetails from '../../components/profile/ProfileDetails';
import SecuritySection from '../../components/profile/SecuritySection';
import PermissionsSection from '../../components/profile/PermissionsSection';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

const ProfilePage: React.FC = () => {
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const { user, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-md border border-red-200 max-w-md">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => window.location.href = '/auth'}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Redirect if no user found
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <MainLayout title="My Profile">
      <ProfileDetails user={user} />
      <SecuritySection
        showChangePassword={showChangePassword}
        onShowChangePassword={setShowChangePassword}
      />
      <PermissionsSection />
    </MainLayout>
  );
};

export default ProfilePage;