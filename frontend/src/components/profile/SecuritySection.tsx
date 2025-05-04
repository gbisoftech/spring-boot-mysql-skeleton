import React, { useState } from 'react';
import Button from '../ui/Button';
import ChangePasswordForm from './ChangePasswordForm';

type SecuritySectionProps = {
  showChangePassword: boolean;
  onShowChangePassword: (show: boolean) => void;
};

const SecuritySection: React.FC<SecuritySectionProps> = (
  { showChangePassword, onShowChangePassword }
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePasswordChange = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement password change logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      onShowChangePassword(false);
    } catch (error) {
      console.error('Failed to change password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between md:flex-row flex-col bg-white rounded-lg">
        <div className="font-bold mb-4">Security</div>
        <div className="md:w-2/3 p-7 border border-grey">
          {showChangePassword ? (
            <div className="transition-all duration-300 ease-in-out">
              <ChangePasswordForm onCancel={() => onShowChangePassword(false)} />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                Password: ••••••••
              </div>
              <Button
                onClick={() => onShowChangePassword(true)}
                disabled={isLoading}
                className="min-w-[120px]"
              >
                {isLoading ? 'Changing...' : 'Change password'}
              </Button>
            </div>
          )}
        </div>
      </div>
      <hr className="border-t border-gray-150 my-4" />
    </>
  );
};

export default SecuritySection; 