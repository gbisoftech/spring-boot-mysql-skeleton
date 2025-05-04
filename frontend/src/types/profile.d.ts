export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type Role = 'Super Admin' | 'Admin';

export type Permission = 'Account' | 'Provider' | 'Listings' | 'Banners';

export type AccountPermissions = {
  accountName: string;
  roles: {
    role: Role;
    permissions: Permission[];
  }[];
}; 