import React from "react";
import { verifyToken } from "lib/auth/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function withAuth<P>(Component: React.ComponentType<P>) {
  const AuthenticatedComponent: React.FC<React.PropsWithChildren<P>> = async (
    props: React.PropsWithChildren<P>,
  ) => {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

    const isAuthenticated = await verifyToken(token);

    if (!isAuthenticated) {
      redirect("/login");
      return null; // Prevent rendering if not authenticated
    }

    return <Component {...props} />;
  };

  // Set displayName for debugging
  AuthenticatedComponent.displayName = `WithAuth(${Component.displayName || Component.name || "Component"})`;

  return AuthenticatedComponent;
}
