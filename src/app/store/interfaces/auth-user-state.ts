import {AuthUser} from "../../commons/interfaces/auth-user";

export interface AuthUserState {
  isLoading: string;
  error: any;
  user: AuthUser;
}
