import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCheck } from '@fortawesome/free-solid-svg-icons';

const PermissionsSection: React.FC = () => (
  <>
    <div className="flex md:flex-row flex-col justify-between bg-white rounded-lg">
      <div className="w-1/3 font-bold items-start mb-4 flex gap-2">
        <span>Permissions</span>
        <span><FontAwesomeIcon icon={faGear} /></span>
      </div>
      <div className="md:w-2/3 p-7 border border-grey space-y-4">
        <div>
          <div className="font-medium text-sm">Account name (1)</div>
          <div className='flex mt-2'>
            <div className="w-1/2 text-sm text-gray-600">Role: Super Admin</div>
            <ul
              className="w-1/2 list-disc ml-6 text-sm"
              style={{ listStyleType: 'none' }}
            >
              <li>
                <span className='text-green-500'><FontAwesomeIcon icon={faCheck} /> </span>
                Account</li>
              <li>
                <span className='text-green-500'><FontAwesomeIcon icon={faCheck} /> </span>
                Provider</li>
            </ul>
          </div>
          <div className='flex mt-2'>
            <div className="w-1/2 text-sm text-gray-600">Role: Admin</div>
            <ul
              className="w-1/2 list-disc ml-6 text-sm"
              style={{ listStyleType: 'none' }}
            >
              <li>
                <span className='text-green-500'><FontAwesomeIcon icon={faCheck} /> </span>
                Listings</li>
              <li>
                <span className='text-green-500'><FontAwesomeIcon icon={faCheck} /> </span>
                Banners</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="font-medium text-sm">Account name (2)</div>
          <div className='flex mt-2'>
            <div className="w-1/2 text-sm text-gray-600">Role: Super Admin</div>
            <ul
              className="w-1/2 list-disc ml-6 text-sm"
              style={{ listStyleType: 'none' }}
            >
              <li>
                <span className='text-green-500'><FontAwesomeIcon icon={faCheck} /> </span>
                Account
              </li>
              <li>
                <span className='text-green-500'><FontAwesomeIcon icon={faCheck} /> </span>
                Provider
              </li>
            </ul>
          </div>
          <div className='flex mt-2'>
            <div className="w-1/2 text-sm text-gray-600">Role: Admin</div>
            <ul
              className="w-1/2 list-disc ml-6 text-sm"
              style={{ listStyleType: 'none' }}
            >
              <li>
                <span className='text-green-500'><FontAwesomeIcon icon={faCheck} /> </span>
                Listings</li>
              <li>
                <span className='text-green-500'><FontAwesomeIcon icon={faCheck} /> </span>
                Banners</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr className="border-t border-gray-150" />
  </>
);

export default PermissionsSection; 
