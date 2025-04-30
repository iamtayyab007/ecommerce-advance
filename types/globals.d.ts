export type Roles = "admin" | "customer" | "guest";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
      username?: string;
    };
  }
}
