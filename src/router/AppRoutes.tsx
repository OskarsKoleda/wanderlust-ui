import { RootLayout } from "@/layouts/RootLayout";
import { Home } from "@/pages/Home";
import { Route, Routes } from "react-router";
import { routes } from "./routes";
import { Signup } from "@/pages/Signup";
import { Login } from "@/pages/Login";
import { ProtectedLayout } from "@/layouts/ProtectedLayout";
import { EditTrip } from "@/pages/CreateNewTrip/CreateNewTrip";
import { AllTrips } from "@/pages/AllTrip";
import { TripDetails } from "@/pages/TripDetails";
import { MyTrips } from "@/pages/MyTrips/MyTrips";

// TODO: ProtectedLayout redirects to login but doesn’t pass state={{ from: location }},
// so you can’t send users back to the page they wanted after login

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path={routes.signup} element={<Signup />} />
        <Route path={routes.login} element={<Login />} />
        <Route element={<ProtectedLayout />}>
          <Route path={routes.explore} element={<AllTrips />} />
          <Route path={routes.profile} />
          <Route path={routes.myTrips} element={<MyTrips />} />
          <Route path={`${routes.myTrips}/:id`} element={<TripDetails />} />
          <Route path={`${routes.myTrips}/:id/edit`} element={<EditTrip />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
