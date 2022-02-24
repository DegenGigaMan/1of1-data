import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="w-screen h-screen p-3 flex flex-col justify-items-stretch">
      <div className="flex flex-col">
        <Header />
        <div className="w-full flex flex-col p-2">
          <h1 className="text-left font-semibold text-5xl">
            Holaplex Creator Leaderboard
          </h1>
          <span className="text-right">*Updated every 24hrs</span>
        </div>
      </div>
      <main className="flex-auto w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
