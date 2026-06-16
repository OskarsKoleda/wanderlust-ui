import { useAuth } from "@/context/auth-context";
import { routes } from "@/router/routes";
import { Navigate, Outlet } from "react-router";

export function ProtectedLayout() {
  const { user, isInitializing } = useAuth();

  if (isInitializing) {
    return null;
  }

  return user ? (
    <div className="bg-background">
      <main>
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to={routes.login} />
  );
}
