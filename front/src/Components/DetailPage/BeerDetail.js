import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import DetailHeader from "./DetailHeader";
import Comments from "./Comments";

import "./css/BeerDetail.css";

export default function BeerDetail({ id }) {
  const [beer, setBeer] = useState(null);
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const fetchUser = async () => {
    const res = await fetch("/getUser");
    if (res.status === 200) {
      const userName = await res.json();
      setUser(userName);
      fetchBeerById(id, userName);
    } else {
      setUser(null);
      fetchBeerById(id, null);
    }
  };

  const fetchBeerById = async (id, userName) => {
    const url = `/beers?id=${id}`;
    const res = await fetch(url);

    if (res.status === 200) {
      const beerInfo = await res.json();

      if (beerInfo) {
        setBeer(beerInfo);
        if (userName) {
          setIsLiked(beerInfo.like.includes(userName));
          setIsDisliked(beerInfo.dislike.includes(userName));
        }
      } else {
        console.error("Can not get beer by id " + id + "!");
      }
    } else {
      console.error("Can not get beer by id " + id + "!");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const clickLike = async () => {
    if (user) {
      const res = await fetch("/updateLike", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          action: isLiked ? "remove" : "add",
        }),
      });

      if (res.status === 200) {
        fetchBeerById(id, user);
      } else {
        alert("Update like failed!");
      }
    }
  };

  const clickDislike = async () => {
    if (user) {
      const res = await fetch("/updateDislike", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          action: isDisliked ? "remove" : "add",
        }),
      });

      if (res.status === 200) {
        fetchBeerById(id, user);
      } else {
        alert("Add dislike failed!");
      }
    }
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
                className="beer-detail-img"
                src={process.env.PUBLIC_URL + "/images/" + beer.img}
                alt={beer.name}
              />
            </div>
            <div className="beer-detail-info-container">
              <div className="beer-detail-info">
                <div className="beer-detail-label">Style:</div>
                <div className="beer-detail-value">
                  {beer.style.charAt(0).toUpperCase() + beer.style.slice(1)}
                </div>
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
                <div className="beer-like-container">
                  <i
                    className={
                      user
                        ? isLiked
                          ? "far fa-thumbs-up beer-detail-like-icon icon-is-clicked"
                          : "far fa-thumbs-up beer-detail-like-icon"
                        : "far fa-thumbs-up beer-detail-like-icon-disabled"
                    }
                    onClick={clickLike}
                  ></i>
                  <span className={isLiked ? "icon-is-clicked" : ""}>
                    {" " + beer.like.length}
                  </span>
                </div>
                <div className="beer-dislike-container">
                  <i
                    className={
                      user
                        ? isDisliked
                          ? "far fa-thumbs-down beer-detail-dislike-icon icon-is-clicked"
                          : "far fa-thumbs-down beer-detail-dislike-icon"
                        : "far fa-thumbs-down beer-detail-dislike-icon-disabled"
                    }
                    onClick={clickDislike}
                  ></i>
                  <span className={isDisliked ? "icon-is-clicked" : ""}>
                    {" " + beer.dislike.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="beer-detail-lower-container">
            <Comments id={id} user={user}></Comments>
          </div>
        </div>
      </div>
    );
  }
}

BeerDetail.propTypes = {
  id: PropTypes.string.isRequired,
};
