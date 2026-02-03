import session from "express-session";

export const sessionMiddleware = session({
  name: "inventory.sid",
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax",
  },
});