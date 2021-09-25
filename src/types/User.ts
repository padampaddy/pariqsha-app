export interface SignupRequest {
  registration: Registration;
  user: SignupUser;
}
export interface Registration {
  applicationId: string;
  data?: any;
  preferredLanguages?: string[] | null;
  roles?: string[] | null;
  username?: string;
}
export interface SignupUser {
  email: string;
  password: string;
}

export interface SignupSigninResponse {
  refreshToken?: string;
  token?: string;
  user?: User;
}

export interface User {
  active: boolean;
  email: string;
  id: string;
  username: string;
  verified: boolean;
  password?: string;
}
export interface UserState {
  entities: SignupSigninResponse | undefined;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export interface User {
  data?: any;
  email: string;
  id: string;
  username: string;
  verified: boolean;
}

export interface IUserProfile{
    name: string;
    id: string;
    image_url: string;
}
