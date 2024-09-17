import React from "react";
import LoadingSpinner from "@/components/UI/LoadingSpinner/LoadingSpinner";
import { useAuth } from "@hooks/useAuth/useAuth";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthHOC: React.FC = (props) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthHOC.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return AuthHOC;
};

export default withAuth;
