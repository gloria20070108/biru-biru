import React from "react";

import TopBar from "../Components/TopBar/TopBar";

import HomeHeader from "../Components/HomePage/HomeHeader";

export default function HomePage() {
  return (
    <div className="app">
      <TopBar />
      <HomeHeader />
    </div>
  );
}
