import {AuthToken} from "../access-token/models/auth-token";
import {HttpError} from "../../commons/interfaces/http-error";

export interface AuthTokenState {
  loading: boolean;
  authToken?: AuthToken | null;
  error?: HttpError | null;
}
