import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import DetailHeader from "./DetailHeader";
import Comments from "./Comments";

export default function BeerDetail({ id }) {
  const [beer, setBeer] = useState(null);

  // TODO: make fetch function work with the real backend
  const fetchBeerById = async (id) => {
    const url = `/beers?id=${id}`;
    const res = await fetch(url);

    if (res.status === 200) {
      const beerInfo = await res.json();

      if (beerInfo) {
        setBeer(beerInfo);
      } else {
        console.error("Can not get beer by id " + id + "!");
      }
    } else {
      console.error("Can not get beer by id " + id + "!");
    }
  };

  useEffect(() => {
    fetchBeerById(id);
  }, []);

  // TODO: improve the like/dislike logic here
  // just like youtube
  // a user should only be allowed to like or dislike once for one beer.
  // if a user clicks like, it should cancel the existing dislike if any, vice versa.
  // optional feature
  const increaseLike = () => {
    console.log("like++");
    fetchBeerById(id);
  };

  const increaseDislike = () => {
    console.log("dislike++");
    fetchBeerById(id);
  };

  if (!beer) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <DetailHeader text={beer.name} />
        <div className="beer-detail-container">
          <div className="beer-detail-upper-container">
            <div className="beer-detail-img-container">
              <img
                className="beer-img"
                src={process.env.PUBLIC_URL + "/images/" + beer.img}
                alt={beer.name}
              />
            </div>
            <div className="beer-detail-info-container">
              <div className="beer-detail-info">
                <div className="beer-detail-label">Style:</div>
                <div className="beer-detail-value">{beer.style}</div>
              </div>
              <div className="beer-detail-info">
                <div className="beer-detail-label">ABV:</div>
                <div className="beer-detail-value">{beer.abv + "%"}</div>
              </div>
              <div className="beer-detail-info">
                <div className="beer-detail-label">Brewery:</div>
                <div className="beer-detail-value">{beer.brewery}</div>
              </div>
              <div className="beer-detail-info">
                <div className="beer-detail-label">Country:</div>
                <div className="beer-detail-value">{beer.country}</div>
              </div>
              <div className="beer-detail-info">
                <div className="beer-detail-label">Flavor:</div>
                <div className="beer-detail-value">
                  {beer.flavors ? beer.flavors.join(", ") : "N/A"}
                </div>
              </div>
              <div className="beer-detail-info">
                <div className="beer-detail-label">Like:</div>
                <div className="beer-detail-value">
                  <i
                    class="far fa-thumbs-up beer-detail-like-icon"
                    onClick={increaseLike}
                  ></i>{" "}
                  {beer.like}
                </div>
              </div>
              <div className="beer-detail-info">
                <div className="beer-detail-label">Dislike:</div>
                <div className="beer-detail-value">
                  <i
                    class="far fa-thumbs-down beer-detail-dislike-icon"
                    onClick={increaseDislike}
                  ></i>{" "}
                  {beer.dislike}
                </div>
              </div>
            </div>
          </div>
          <div className="beer-detail-lower-container">
            <Comments id={id}></Comments>
          </div>
        </div>
      </div>
    );
  }
}

BeerDetail.propTypes = {
  id: PropTypes.string.isRequired,
};
