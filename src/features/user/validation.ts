import type { UseFormGetValues } from "react-hook-form";
import type { SignupFormValues } from "./types";

const USERNAME_MIN_LENGTH = 3;
const PASSWORD_MIN_LENGTH = 6;

export const usernameRules = {
  required: "Username is required",
  minLength: {
    value: USERNAME_MIN_LENGTH,
    message: `Username must be at least ${USERNAME_MIN_LENGTH} characters`,
  },
};

export const emailRules = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address",
  },
};

export const passwordRules = {
  required: "Password is required",
  minLength: {
    value: PASSWORD_MIN_LENGTH,
    message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  },
};

export const passwordRepeatRules = (
  getValues: UseFormGetValues<SignupFormValues>
) => {
  return {
    validate: (value: string) =>
      value === getValues("password") || "Passwords do not match",
  };
};
