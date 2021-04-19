import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Select from "react-select";

import "./css/HomeHeader.css";

export default function HomeHeader(props) {
  const sortOptions = [
    { value: "like-", label: "Most Liked" },
    { value: "abv-", label: "ABV - High to Low" },
    { value: "abv+", label: "ABV - Low to High" },
  ];
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);

  const [styles, setStyles] = useState([{ value: "all", label: "All Styles" }]);
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);

  const [countries, setCountries] = useState([
    { value: "all", label: "All Countries" },
  ]);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const [flavors, setFlavors] = useState([
    { value: "all", label: "All Flavors" },
  ]);
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);

  const getOptions = (data) => {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const name = data[i].name;
      const option = {
        value: name,
        label: name.charAt(0).toUpperCase() + name.slice(1),
      };

      res.push(option);
    }

    return res;
  };

  const fetchStyles = async () => {
    const res = await fetch("beer-styles");

    if (res.status === 200) {
      const allStyles = getOptions(await res.json());
      allStyles.unshift(selectedStyle);
      setStyles(allStyles);
      setSelectedStyle(styles[0]);
    } else {
      console.error("Can't get beer styles");
    }
  };

  const fetchCountries = async () => {
    const res = await fetch("countries");

    if (res.status === 200) {
      const allCountries = getOptions(await res.json());
      allCountries.unshift(selectedCountry);
      setCountries(allCountries);
      setSelectedCountry(countries[0]);
    } else {
      console.error("Can't get countries");
    }
  };

  const fetchFlavors = async () => {
    const res = await fetch("flavors");

    if (res.status === 200) {
      const allFlavors = getOptions(await res.json());
      allFlavors.unshift(selectedFlavor);
      setFlavors(allFlavors);
      setSelectedFlavor(flavors[0]);
    } else {
      console.error("Can't get flavors");
    }
  };

  useEffect(() => {
    fetchStyles();
    fetchCountries();
    fetchFlavors();
  }, []);

  const resetFilters = (e) => {
    e.preventDefault();
    setSelectedStyle(styles[0]);
    setSelectedCountry(countries[0]);
    setSelectedFlavor(flavors[0]);

    if (props.onChange) {
      props.onChange({
        style: "all",
        country: "all",
        flavor: "all",
        sortOption: selectedSortOption.value,
      });
    }
  };

  return (
    <div className="home-header-outter">
      <div className="home-header">
        <div className="filter-container">
          <div className="filter-text">Filter by:</div>
          <Select
            className="selector"
            options={styles}
            onChange={(value) => {
              setSelectedStyle(value);
              if (props.onChange) {
                props.onChange({
                  style: value.value,
                  country: selectedCountry.value,
                  flavor: selectedFlavor.value,
                  sortOption: selectedSortOption.value,
                });
              }
            }}
            value={selectedStyle}
          />
          <Select
            className="selector"
            options={countries}
            onChange={(value) => {
              setSelectedCountry(value);
              if (props.onChange) {
                props.onChange({
                  style: selectedStyle.value,
                  country: value.value,
                  flavor: selectedFlavor.value,
                  sortOption: selectedSortOption.value,
                });
              }
            }}
            value={selectedCountry}
          />
          <Select
            className="selector"
            options={flavors}
            onChange={(value) => {
              setSelectedFlavor(value);
              if (props.onChange) {
                props.onChange({
                  style: selectedStyle.value,
                  country: selectedCountry.value,
                  flavor: value.value,
                  sortOption: selectedSortOption.value,
                });
              }
            }}
            value={selectedFlavor}
          />
          <div className="clear-filter-link">
            <a href="#" onClick={resetFilters}>
              Clear All
            </a>
          </div>
        </div>
        <div className="sort-container">
          <div className="sort-text">Sorted by:</div>
          <Select
            className="selector"
            options={sortOptions}
            onChange={(value) => {
              setSelectedSortOption(value);
              if (props.onChange) {
                props.onChange({
                  style: selectedStyle.value,
                  country: selectedCountry.value,
                  flavor: selectedFlavor.value,
                  sortOption: value.value,
                });
              }
            }}
            defaultValue={selectedSortOption}
          />
        </div>
      </div>
    </div>
  );
}

HomeHeader.propTypes = {
  onChange: PropTypes.func,
};
