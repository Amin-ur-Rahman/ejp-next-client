"use client";

import { SessionProvider } from "next-auth/react";

// This component wraps your main layout to enable NextAuth
export default function NextAuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
