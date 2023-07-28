import {HttpError} from "../../../commons/interfaces/http-error";
import {AuthError} from "../../../commons/interfaces/auth-error";

export interface AuthTokenErrorHttp extends  HttpError {
  error: AuthError;
}
