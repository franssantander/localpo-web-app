import React from "react";
// import Router from "./router";
import AuthProvider from "./context/AuthProvider";
import Routes from "./router";

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};

export default App;
