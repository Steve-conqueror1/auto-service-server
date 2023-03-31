export type UserType = {
  firstName: string;
  secondName: string;
  surName: string;
  email: string;
  password: string;
  userType: 'user' | 'superAdmin' | 'admin';
  userStatus: 'pending' | 'active' | 'blocked';
};
