import {AuthToken} from "../../commons/interfaces/auth-token";

export interface AuthTokenState {
  isLoading: string;
  error: any;
  authToken: AuthToken;
}
