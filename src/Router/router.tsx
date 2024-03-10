import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "../Components/Spinner";
import { NavItems } from "../Shared/constant";

const Router = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default Router;
