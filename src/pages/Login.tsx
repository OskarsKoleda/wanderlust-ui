import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { useLogin } from "@/features/auth/hooks";
import type { LoginFormValues } from "@/features/auth/types";
import { Plane } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export function Login() {
  const formMethods = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    shouldUnregister: true,
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useLogin((data) => {
    setUser(data);
    navigate("/");
  });

  const submitFormHandler = formMethods.handleSubmit((data) => {
    login(data);
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-3">
          <Plane />
          <span className="text-xl font-semibold text-primary">Wanderlust</span>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <h2 className="mb-1">Welcome back!</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Sign in to your account
          </p>

          <FormProvider {...formMethods}>
            <form className="space-y-4" onSubmit={submitFormHandler}>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  {...formMethods.register("email")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="pr-10"
                  {...formMethods.register("password")}
                />
              </div>

              <Button
                id="login"
                type="submit"
                variant="default"
                size="default"
                className="w-full"
                disabled={isLoggingIn}
              >
                Sign in
              </Button>
            </form>
          </FormProvider>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/auth?mode=signup" className="text-primary hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
