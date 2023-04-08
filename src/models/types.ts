export type UserType = {
  firstName?: string;
  secondName?: string;
  surName?: string;
  email: string;
  password?: string;
  userPermission: 'user' | 'superAdmin' | 'admin';
  userStatus: 'pending' | 'active' | 'blocked';
};
