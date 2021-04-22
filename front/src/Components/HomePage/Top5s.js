import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import Beer from "./Beer";

import "./css/Top5s.css";

export default function Top5s({ title, sortOption }) {
  const [beers, setBeers] = useState([]);
  const fetchBeers = async () => {
    const url = `/beers?sortOption=${sortOption}&limit=5`;
    const res = await fetch(url);

    if (res.status === 200) {
      const top5Beers = await res.json();
      setBeers(top5Beers);
    } else {
      console.error("Can not get top 5 beers.");
    }
  };

  useEffect(() => {
    fetchBeers();
  }, []);

  return (
    <div>
      <div className="top-5s-title">{title}</div>
      {beers &&
        beers.map((value, index) => {
          return <Beer key={value.name} beer={value} />;
        })}
    </div>
  );
}

Top5s.propTypes = {
  title: PropTypes.string.isRequired,
  sortOption: PropTypes.string.isRequired,
};
