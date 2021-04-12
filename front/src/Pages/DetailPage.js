import React from "react";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import TopBar from "../Components/TopBar/TopBar";
import BeerDetail from "../Components/DetailPage/BeerDetail";

export default function DetailPage() {
  const { id } = useParams();

  return (
    <div className="app">
      <TopBar />
      <BeerDetail id={id} />
    </div>
  );
}

DetailPage.propTypes = {};
