export interface User {
  id: number;
  username: string;
  email: string;
}

export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
}

export interface SignupFormValues extends CreateUserPayload {
  passwordRepeat: string;
}
