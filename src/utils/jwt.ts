// utils/jwt.ts
export function decodeJWT(token: string): any | null {
  try {
    return JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
  } catch (e) {
    return null;
  }
}
