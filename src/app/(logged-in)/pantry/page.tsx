"use client";

import { useAuth } from "hooks/useAuth/useAuth";

const Pantry = () => {
  useAuth();

  return <div>Pantry</div>;
};

export default Pantry;
