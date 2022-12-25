export type SignUpType = {
  name: string;
  email: string;
  password: string;
};
export type SignInType = {
  email: string;
  password: string;
};
export type AuthActionType = 'logout' | 'delete' | 'refresh' | 'uploading image' | '';
export type User = {
  id: string;
  name: string;
  image: string;
  email: string;
  isRegistered: boolean;
  provider: 'google' | 'No_Provider';
  createdAt: string;
  updatedAt: string;
};
