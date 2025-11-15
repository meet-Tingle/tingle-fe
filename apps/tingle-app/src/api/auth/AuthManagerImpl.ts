import type { AuthManagerInterface } from "@tingle/api";

class AuthManager implements AuthManagerInterface {
  private _accessToken: string | null = null;

  public get isAuthenticated(): boolean {
    return this._accessToken !== null;
  }

  public get accessToken() {
    return this._accessToken;
  }

  public get refreshToken() {
    return getRefreshToken();
  }

  public setTokens(accessToken: string, refreshToken: string) {
    this._accessToken = accessToken;
    setRefreshToken(refreshToken);
  }

  public clearTokens() {
    this._accessToken = null;
    clearRefreshToken();
  }
}

// TODO: 추후 실제 프로덕트에는 Coockie를 사용하여 구현 필요
const getRefreshToken = () => {
  return localStorage.getItem("refreshToken") ?? null;
};

const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem("refreshToken", refreshToken);
};

const clearRefreshToken = () => {
  localStorage.removeItem("refreshToken");
};

export const authManager = new AuthManager();
