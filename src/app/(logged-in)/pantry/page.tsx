"use client";

import { useAuth } from "hooks/useAuth/useAuth";

const Pantry = () => {
  const isLoggedIn = useAuth();

  return isLoggedIn && <div>Pantry</div>;
};

export default Pantry;
