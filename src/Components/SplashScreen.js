import React, { useEffect } from "react";
import "./SplashScreen.css";
import logo from "../Components/Clock image.jpg"; // Adjust the path to your logo image

const SplashScreen = ({ onSplashEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSplashEnd();
    }, 3000); // Splash screen duration: 3 seconds

    return () => clearTimeout(timer);
  }, [onSplashEnd]);

  return (
    <div className="splash-screen">
      <img src={logo} alt="Logo" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;
