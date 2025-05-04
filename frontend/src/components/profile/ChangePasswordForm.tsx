import React, { useState, useCallback } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import api from "../../utils/axios";
import axios from "axios";
import { useToast } from "../ui/Alert";

type ChangePasswordFormProps = {
  onCancel: () => void;
};

type FormErrors = {
  current?: string;
  new_password?: string;
  confirm?: string;
};

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onCancel,
}) => {
  const { showToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};

    if (!currentPassword) {
      newErrors.current = "Current password is required";
    }

    if (!newPassword) {
      newErrors.new_password = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.new_password = "Password must be at least 8 characters long";
    }

    if (!confirmPassword) {
      newErrors.confirm = "Please confirm your new password";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentPassword, newPassword, confirmPassword]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);

      try {
        // Get CSRF token using the direct axios instance (not the api instance with baseURL)
        //await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

        // Use the correct endpoint for password change
        const response = await api.post("/changePassword", {
          oldPassword: currentPassword,
          newPassword: newPassword,
          // password_confirmation: confirmPassword,
        });

        // Show success message
        showToast("Password changed successfully", "success");

        // Clear form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        // Close the form
        onCancel();
      } catch (error: any) {
        console.error("Password change error:", error.response?.data);

        // Show error message from API if available
        const errorMessage =
          error.response?.data?.message ||
          "Failed to change password. Please try again.";

        showToast(errorMessage, "warning");

        // Set form-specific errors if provided by the API
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      validateForm,
      currentPassword,
      newPassword,
      confirmPassword,
      showToast,
      onCancel,
    ]
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        type="password"
        placeholder="Enter current password"
        value={currentPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCurrentPassword(e.target.value)
        }
        label="Current password"
        error={errors.current}
        disabled={isSubmitting}
      />
      <Input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewPassword(e.target.value)
        }
        label="New password"
        error={errors.new_password}
        disabled={isSubmitting}
      />
      <Input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value)
        }
        label="Confirm new password"
        error={errors.confirm}
        disabled={isSubmitting}
      />
      <div className="flex space-x-2">
        <Button
          type="button"
          className="bg-gray-300 text-black hover:bg-gray-400"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Changing..." : "Change password"}
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
