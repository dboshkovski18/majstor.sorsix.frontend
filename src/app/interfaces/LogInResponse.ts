import {User} from "./User";

export interface LogInResponse{
  access_token: string,
  user: User
}
