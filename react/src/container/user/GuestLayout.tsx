import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import { Footer } from "../../components/user/Footer";

const GuestLayout: React.FC = () => {

  return (
    <div id="guestLayout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default GuestLayout;
