"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.auth_token;

    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }

    setLoading(false);
  }, [router]);

  return { isAuthenticated, loading };
};
