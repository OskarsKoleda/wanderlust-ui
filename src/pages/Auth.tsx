import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { useSearchParams } from "react-router";

export function Auth() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") ?? "login";

  return mode === "signup" ? <Signup /> : <Login />;
}
