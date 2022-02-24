import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "pages";

const routes = [
  { path: "/", element: <Home /> },
  { path: "*", element: <Home /> },
];

const buildRoutes = () => (
  <Routes>
    {routes.map((route, index) => (
      <Route key={`route-${index}`} {...route} />
    ))}
  </Routes>
);

export default buildRoutes;
