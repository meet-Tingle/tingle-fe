import type { AuthManagerInterface } from "@tingle/api";

class AuthManager implements AuthManagerInterface {
  private _accessToken: string | null = null;
  private _refreshToken: string | null = null;

  public get isAuthenticated(): boolean {
    return this._accessToken !== null;
  }

  public get accessToken() {
    return this._accessToken;
  }

  public get refreshToken() {
    return this._refreshToken;
  }

  public setAccessToken(accessToken: string) {
    this._accessToken = accessToken;
  }

  public setRefreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
  }

  public clearAccessToken() {
    this._accessToken = null;
    this._refreshToken = null;
  }
}

export const authManager = new AuthManager();
