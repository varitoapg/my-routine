import { withAuth } from "lib/auth/withAuth";
import React from "react";

const MyRoutinePage = () => {
  return (
    <div>
      <h1>My Routine</h1>
    </div>
  );
};

export default withAuth(MyRoutinePage);
