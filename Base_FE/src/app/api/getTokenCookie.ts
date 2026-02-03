export function getTokenCookie(req: Request): string | null {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader.split(";").map(cookie => {
      const [key, ...rest] = cookie.trim().split("=");
      return [key, rest.join("=")];
    })
  );

  return cookies["token"] || null; // replace "token" with your cookie name
}