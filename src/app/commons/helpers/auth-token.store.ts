import { AuthToken } from "src/app/store/access-token/models/auth-token";

export class AuthTokenStore {
    private static storeTokenKey = 'auth-token';

    public static setToken(authToken: AuthToken): void {
        localStorage.setItem(this.storeTokenKey, JSON.stringify(authToken));
    }

    public static getToken(): AuthToken {

        const authToken: AuthToken = JSON.parse(localStorage.getItem('auth-token') as string) as AuthToken;

        return authToken;
    }
}