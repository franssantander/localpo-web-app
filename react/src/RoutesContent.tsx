import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useRoutesContent } from "./hooks/useRoutesContent";

const RoutesContent: React.FC = () => {
  const { routes } = useRoutesContent();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes &&
          routes.map((route, index) => {
            const LazyComponent = React.lazy(
              () => import(`./pages/employer/${route.component}`)
            );
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LazyComponent apiKey={route.key} apiTable={route.table} />
                }
              >
                <Route
                  index
                  element={
                    <LazyComponent apiKey={route.key} apiTable={route.table} />
                  }
                />
              </Route>
            );
          })}
      </Routes>
    </Suspense>
  );
};

export default RoutesContent;
