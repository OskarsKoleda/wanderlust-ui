import { Plane } from "lucide-react";

export function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-3 mb-8">
            <Plane/>
            <span className="text-primary text-xl font-semibold">
                Wanderlust
            </span>
        </div>
        <form action="">
          <input type="text" value="Email" />
        </form>
      </div>
    </div>
  );
}
