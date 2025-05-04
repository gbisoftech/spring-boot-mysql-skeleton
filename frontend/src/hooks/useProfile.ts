import { UserProfile, AccountPermissions } from '../types/profile';

export function useProfile() {
  // Mock user profile
  const user: UserProfile = {
    id: '1',
    name: 'Joleen Collins',
    email: 'joleencollins@skylarkgroup.com',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  };

  // Mock permissions
  const permissions: AccountPermissions[] = [
    {
      accountName: 'Account name (1)',
      roles: [
        { role: 'Super Admin', permissions: ['Account', 'Provider', 'Listings', 'Banners'] },
        { role: 'Admin', permissions: ['Account', 'Provider', 'Listings', 'Banners'] },
      ],
    },
    {
      accountName: 'Account name (2)',
      roles: [
        { role: 'Super Admin', permissions: ['Account', 'Provider', 'Listings', 'Banners'] },
        { role: 'Admin', permissions: ['Account', 'Provider', 'Listings', 'Banners'] },
      ],
    },
  ];

  return { user, permissions };
} 