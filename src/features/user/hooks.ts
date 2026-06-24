import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUser, getUserTrips } from "./api";
import type { CreateUserPayload, User } from "./types";
import type { AxiosError } from "axios";

export const useCreateUser = (options?: {
  onSuccess?: (data: User) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError<{ message: string }>, CreateUserPayload>({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });
};

export const useGetUserTrips = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["user", userId, "trips"],
    queryFn: () => getUserTrips(userId!),
    enabled: !!userId,
  });
};
