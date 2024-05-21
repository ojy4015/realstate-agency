export { default } from "next-auth/middleware";

// these paths are protected
export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
