import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Info from "./info";
import Prev from "./prev";
import Footer from "./footer";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Info />
      <Prev />
      <Footer />
    </div>
  );
}

export default Home;
