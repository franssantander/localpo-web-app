import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Footer } from "../../components/user/Footer";

const UserLayout: React.FC = () => {
  return (
    <div id="userLayout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
