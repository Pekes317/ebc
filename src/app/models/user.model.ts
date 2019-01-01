export interface User {
  email: string;
  displayName: string;
  photoUrl: string;
}

export interface AuthUser extends User {
  token: string;
}

export interface NewUser extends User {
  disabled: boolean;
  emailVerified: boolean;
  password: string;
}

export interface Svg {
  id: number;
  path: string;
  disable: boolean;
  itemID: number;
}
