import { IUserJWT } from './user-jwt.interface';

export interface IUserResponse extends IUserJWT {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly fullname?: string;
  readonly avatar?: string;
  readonly dob?: string;
  readonly gender?: string;
  readonly phoneNumber?: string;
  readonly userRole: string;
  readonly userTitle?: string;
}
