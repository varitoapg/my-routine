import { verifyToken } from "lib/auth/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MyRoutinePage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  const isAuthenticated = await verifyToken(token);

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div>
      <h1>My Routine</h1>
    </div>
  );
};

export default MyRoutinePage;
