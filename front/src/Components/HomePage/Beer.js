import React from "react";

import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import "./css/Beer.css";

export default function Beer({ beer }) {
  return (
    <div className="beer">
      <Link to={"/detail/" + beer._id} state={beer}>
        <div className="beer-img-container">
          <img
            className="beer-img"
            src={process.env.PUBLIC_URL + "/images/" + beer.img}
            alt={beer.name}
          />
          <div class="beer-img-text-container">
            <div class="beer-img-text">{beer.name}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

Beer.propTypes = {
  beer: PropTypes.object.isRequired,
};
