export interface User {
  id: string;
  username?: string;
  avatar?: string;
  email?: string;
  role?: string;

  [key: string]: unknown;
}
