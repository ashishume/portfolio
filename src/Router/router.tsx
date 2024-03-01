import { BrowserRouter, Route, Routes } from "react-router-dom";
import { navItems } from "../Shared/contants";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {navItems.map(({ label, route, Component }) => {
          return <Route path={route} key={label} element={<Component />} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
