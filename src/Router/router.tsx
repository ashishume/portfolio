import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "../Components/Spinner";
import { NavItems } from "../Shared/constant";
import { usePageTracking } from "../Shared/hooks/usePageTracking";

const RouterContent = () => {
  // Track page views on route changes
  usePageTracking();

  return (
    <Routes>
      {NavItems.map(({ label, route, Element }) => {
        return (
          <Route
            key={label}
            path={route}
            element={
              <Suspense fallback={<Spinner />}>
                <Element />
              </Suspense>
            }
          />
        );
      })}
    </Routes>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
};

export default Router;
