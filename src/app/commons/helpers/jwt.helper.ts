const jwtDecode = require('jwt-decode');
export class JwtHelper {
  public static decode(jwt: string) {
    return jwtDecode.default(jwt);
  }
}
