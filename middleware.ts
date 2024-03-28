export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/settings"],
  // matcher: ["/((?!register|api|login).*)"],
};
