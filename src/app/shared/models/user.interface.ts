export type Roles = 'SUSCRIPTOR' | 'ADMIN';

export interface User {
  user_id: string;
  password: string;
}

export interface UserResponse extends User {
  code: string;
  status: string;
  message: string;
  token: string;
  data: [];
  role: Roles;
}

export class Person {
  id: number;
  firstName: string;
  lastName: string;
}

