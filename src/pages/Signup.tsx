import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { useCreateUser } from "@/features/user/hooks";
import type { SignupFormValues } from "@/features/user/types";
import {
  emailRules,
  passwordRepeatRules,
  passwordRules,
  usernameRules,
} from "@/features/user/validation";
import { Plane } from "lucide-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const formMethods = useForm<SignupFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    trigger,
  } = formMethods;

  const password = useWatch({ control, name: "password" });

  const { mutate: createUser, isPending: isCreatingUser } = useCreateUser(
    (data) => {
      setUser(data);
      navigate("/");
    }
  );

  const submitFormHandler = handleSubmit((data) => {
    const { passwordRepeat: _, ...payload } = data;
    createUser(payload);
  });

  const renderError = ({ message }: { message?: string }) => {
    return message ? (
      <p className="text-sm text-destructive">{message}</p>
    ) : null;
  };

  useEffect(() => {
    trigger("passwordRepeat");
  }, [trigger, password]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-3">
          <Plane />
          <span className="text-xl font-semibold text-primary">Wanderlust</span>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <h2 className="mb-1">Create an account</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Start recording your travels
          </p>

          <form className="space-y-4" onSubmit={submitFormHandler} noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="pr-10"
                {...register("username", usernameRules)}
              />
              {renderError({ message: errors.username?.message })}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", emailRules)}
              />
              {renderError({ message: errors.email?.message })}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pr-10"
                {...register("password", passwordRules)}
              />
              {renderError({ message: errors.password?.message })}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password-repeat">Repeat Password</Label>
              <Input
                id="password-repeat"
                type="password"
                placeholder="Repeat your password"
                className="pr-10"
                {...register("passwordRepeat", passwordRepeatRules(getValues))}
              />
              {renderError({ message: errors.passwordRepeat?.message })}
            </div>

            <Button
              id="signup"
              type="submit"
              variant="default"
              size="default"
              className="w-full"
              disabled={isCreatingUser}
            >
              {isCreatingUser ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth?mode=login" className="text-primary hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
