export interface Permission {
  role: string;
  permissions: string[];
}

export interface AccountPermissions {
  account: string;
  roles: Permission[];
}

export const permissionsData: AccountPermissions[] = [
  {
    account: 'Account name (1)',
    roles: [
      { role: 'Super Admin', permissions: ['Account', 'Provider'] },
      { role: 'Admin', permissions: ['Listings', 'Banners'] },
    ],
  },
  {
    account: 'Account name (2)',
    roles: [
      { role: 'Super Admin', permissions: ['Account', 'Provider'] },
      { role: 'Admin', permissions: ['Listings', 'Banners'] },
    ],
  },
]; 