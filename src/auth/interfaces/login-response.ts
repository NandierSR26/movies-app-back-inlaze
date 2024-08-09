import { Users } from '../entities/user.entity';

export interface LoginResponse {
  user: Users;
  token: string;
}
