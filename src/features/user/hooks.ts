import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "./api";
import type { CreateUserPayload, User } from "./types";
import type { AxiosError } from "axios";

export const useCreateUser = (onSuccess?: (data: User) => void) => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError<{ message: string }>, CreateUserPayload>({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      onSuccess?.(data);
    },
  });
};
