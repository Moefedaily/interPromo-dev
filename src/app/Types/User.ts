export interface User {
  id: number;
  name: string;
  mail: string;
  phone: string;
  password?: string;
}
export interface LoginData {
  mail: string;
  password: string;
}

export interface RegistrationData extends LoginData {
  name: string;
  phone: string;
}
