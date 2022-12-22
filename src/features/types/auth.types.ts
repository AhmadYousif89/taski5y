export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};
export type SignInRequest = {
  email: string;
  password: string;
};
export type AuthActionType = 'logout' | 'delete' | 'refresh' | 'uploading image' | '';
export type User = {
  id: string;
  name: string;
  image: string;
  email: string;
  provider: 'google' | 'No_Provider';
  createdAt: string;
  updatedAt: string;
};
