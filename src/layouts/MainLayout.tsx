import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="w-full h-full px-5 flex flex-col justify-items-stretch">
      <Header />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
