import type { User } from "@/features/user/types";
import type { ReactNode } from "react";
import { AuthContext } from "./auth-context";
import { useCurrentUser } from "@/features/user/hooks";
import { useQueryClient } from "@tanstack/react-query";

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { data: user = null, isPending: isInitializing } = useCurrentUser();
  const setUser = (user: User | null) => {
    queryClient.setQueryData(["user"], user);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
}
