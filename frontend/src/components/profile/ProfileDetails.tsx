import React, { useRef, useState } from 'react';
import { mockUser, User } from '../../types/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

type ProfileDetailsProps = {
  user: User;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | undefined>(mockUser.avatar);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="rounded-xl overflow-hidden">
        <div className="flex md:flex-row flex-col mt-4 justify-between gap-2">
          <div className="md:w-1/3 w-full font-bold">
            Personal Details
          </div>

          <div className="md:w-2/3 w-full p-7 border border-grey">
            {/* Use the random avatar URL */}
            <div className="relative w-16 h-16">
              <img
                src={avatar}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <button
                onClick={handleAvatarClick}
                className="absolute bottom-[-5px] right-[-5px] bg-gray-700 hover:bg-gray-800 text-white 
                            w-8 h-8 flex items-center justify-center 
                            rounded-full border-2 border-white"
              >
                <FontAwesomeIcon icon={faPen} size="xs" />
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
            <div className="my-8">
              <label className="block text-gray-700 text-xs font-bold">
                Full name
              </label>
              <div className="text-gray-900 text-xs">
                {user.name}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-bold">
                Email
              </label>
              <div className="text-gray-900 text-xs break-all">
                {user.email}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-150 my-4" />
    </>
  );
};

export default ProfileDetails;