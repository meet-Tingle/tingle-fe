export interface AuthManagerInterface {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  clearAccessToken: () => void;
  isAuthenticated: boolean;
}
