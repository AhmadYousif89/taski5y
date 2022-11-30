export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};
export type SignInRequest = {
  email: string;
  password: string;
};
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
