import React, { useState, useEffect } from "react";

import TopBar from "../Components/TopBar/TopBar";

import HomeHeader from "../Components/HomePage/HomeHeader";
import BeersContainer from "../Components/HomePage/BeersContainer";

export default function HomePage() {
  const [beers, setBeers] = useState([]);

  // TODO: make fetch function work with the real backend
  const fetchBeers = async () => {
    const res = [
      { id: "beer1", name: "Tsarina Esra", img: "tsarina-esra.jpg", like: 5 },
      {
        id: "beer2",
        name: "Watermelon Lager",
        img: "watermelon-lager.jpg",
        like: 6,
      },
      { id: "beer1", name: "Tsarina Esra", img: "tsarina-esra.jpg", like: 5 },
      {
        id: "beer2",
        name: "Watermelon Lager",
        img: "watermelon-lager.jpg",
        like: 6,
      },
      { id: "beer1", name: "Tsarina Esra", img: "tsarina-esra.jpg", like: 5 },
      {
        id: "beer2",
        name: "Watermelon Lager",
        img: "watermelon-lager.jpg",
        like: 6,
      },
    ];

    setBeers(res);
  };

  useEffect(() => {
    fetchBeers();
  }, []);

  return (
    <div className="app">
      <TopBar />
      <HomeHeader />
      <BeersContainer beers={beers} />
    </div>
  );
}
