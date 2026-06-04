import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
