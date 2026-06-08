import { useQueryClient, useMutation } from "@tanstack/react-query";
import { login, logout } from "./api";
import type { User } from "../user/types";

export const useLogout = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      onSuccess?.();
    },
  });
};

export const useLogin = (onSuccess?: (data: User) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      onSuccess?.(data);
    },
  });
};
