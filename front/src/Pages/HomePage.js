import React, { useState, useEffect } from "react";

import TopBar from "../Components/TopBar/TopBar";

import HomeHeader from "../Components/HomePage/HomeHeader";
import BeersContainer from "../Components/HomePage/BeersContainer";

export default function HomePage() {
  const [beers, setBeers] = useState([]);

  const fetchBeers = async (options) => {
    let params = "";
    for (const [key, value] of Object.entries(options)) {
      params += `${key}=${value}&`;
    }

    const url = "/beers?" + params.slice(0, -1);
    const res = await fetch(url);

    if (res.status === 200) {
      const allBeers = await res.json();
      setBeers(allBeers);
    } else {
      console.error("Can not get beers.");
    }
  };

  useEffect(() => {
    fetchBeers({
      styles: "all",
      countries: "all",
      flavors: "all",
      sortOption: "like-",
    });
  }, []);

  const handleSelectChanges = (selectedOptions) => {
    fetchBeers(selectedOptions);
  };

  return (
    <div className="app">
      <TopBar />
      <HomeHeader onChange={handleSelectChanges} />
      <BeersContainer beers={beers} />
    </div>
  );
}
