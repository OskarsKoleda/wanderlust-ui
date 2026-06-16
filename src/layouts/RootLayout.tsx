import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Header />
      <main className="overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
