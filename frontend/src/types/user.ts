export interface User {
  id: number | string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  lastPasswordChange?: Date;
  [key: string]: any; // For any additional properties
}

const num = Math.ceil(Math.random() * 45);

export const mockUser: User = {
  id: '1',
  name: 'Joleen Collins',
  email: 'joleencollins@Karieragroup.com',
  avatar: `https://randomuser.me/api/portraits/women/${num}.jpg`,
  role: 'Admin',
  lastPasswordChange: new Date('2024-01-01'),
}; 