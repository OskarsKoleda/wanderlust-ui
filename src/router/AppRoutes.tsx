import { RootLayout } from "@/layouts/RootLayout";
import { Home } from "@/pages/Home";
import { Route, Routes } from "react-router";
import { routes } from "./routes";
import { Auth } from "@/pages/Auth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path={routes.auth} element={<Auth />} />
        <Route path={routes.explore} />
        <Route path={routes.portfolio} />
        <Route path={routes.create} />
        <Route path={routes.profile} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
