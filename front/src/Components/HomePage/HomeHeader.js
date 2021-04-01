import React, { useState, useEffect } from "react";
import Select from "react-select";

import "./css/HomePage.css";

export default function HomeHeader() {
  const sortOptions = [
    { value: "like+", label: "Most liked" },
    { value: "dislike+", label: "Most hated" },
    { value: "abv+", label: "ABV - High to low" },
    { value: "abv-", label: "ABV - Low to High" },
  ];
  let [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);

  let [styles, setStyles] = useState([{ value: "all", label: "All Styles" }]);
  let [selectedStyle, setSelectedStyle] = useState(styles[0]);

  let [countries, setCountries] = useState([
    { value: "all", label: "All Countries" },
  ]);
  let [selectedCountry, setSelectedCountry] = useState(countries[0]);

  let [flavors, setFlavors] = useState([
    { value: "all", label: "All Flavors" },
  ]);
  let [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);

  const fetchStyles = async () => {
    const res = [
      { value: "ale", label: "Ale" },
      { value: "ipa", label: "IPA" },
      { value: "lager", label: "Lager" },
    ];

    console.log("Got Styles", res);
    res.unshift(selectedStyle);
    setStyles(res);
    setSelectedStyle(styles[0]);
  };

  const fetchCountries = async () => {
    const res = [
      { value: "belgium", label: "Belgium" },
      { value: "japan", label: "Japan" },
      { value: "usa", label: "USA" },
    ];

    console.log("Got Countries", res);
    res.unshift(selectedCountry);
    setCountries(res);
    setSelectedCountry(countries[0]);
  };

  const fetchFlavors = async () => {
    const res = [
      { value: "fruit", label: "Fruit" },
      { value: "malt", label: "Malt" },
      { value: "hop", label: "Hop" },
    ];

    console.log("Got Flavors", res);
    res.unshift(selectedFlavor);
    setFlavors(res);
    setSelectedFlavor(flavors[0]);
  };

  useEffect(() => {
    fetchStyles();
    fetchCountries();
    fetchFlavors();
  }, []);

  return (
    <div>
      <h3>Cheers!</h3>
      <Select
        className="selector"
        options={styles}
        onChange={(value) => setSelectedStyle(value)}
        defaultValue={selectedStyle}
      />
      <Select
        className="selector"
        options={countries}
        onChange={(value) => setSelectedCountry(value)}
        defaultValue={selectedCountry}
      />
      <Select
        className="selector"
        options={flavors}
        onChange={(value) => setSelectedFlavor(value)}
        defaultValue={selectedFlavor}
      />
      <Select
        className="selector"
        options={sortOptions}
        onChange={(value) => setSelectedSortOption(value)}
        defaultValue={selectedSortOption}
      />
    </div>
  );
}
