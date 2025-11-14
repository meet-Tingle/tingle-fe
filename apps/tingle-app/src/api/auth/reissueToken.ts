import type { AuthManagerInterface } from "@tingle/api";

interface ReissueResponse {
  accessToken?: string;
  refreshToken?: string;
}

/**
 * refresh token을 사용해서 access token을 재발급받는 함수
 * 성공 시 access token을 반환, 실패 시 null을 반환
 * Api 패키지에 주입된 authManager로 refresh token을 재발급
 * Api instance와 격리되어 순수하게 작동하도록 설계
 * @param authManager
 * @returns
 */
export async function reissueToken(
  authManager: AuthManagerInterface,
): Promise<{ accessToken?: string; refreshToken?: string } | null> {
  const refreshToken = authManager.refreshToken;

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/reissue`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (!response.ok) {
      return null;
    }

    const data: ReissueResponse = await response.json();

    if (!data.accessToken || !data.refreshToken) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Token reissue failed:", error);
    return null;
  }
}
