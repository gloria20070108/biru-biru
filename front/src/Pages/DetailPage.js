import React, { useRef } from "react";

import { useParams } from "react-router-dom";

import TopBar from "../Components/TopBar/TopBar";
import BeerDetail from "../Components/DetailPage/BeerDetail";

export default function DetailPage() {
  const { id } = useParams();
  const detailMainRef = useRef();

  return (
    <div>
      <main id="detail-main" ref={detailMainRef}>
        <div className="app">
          <TopBar mainRef={detailMainRef} />
          <BeerDetail id={id} />
        </div>
      </main>
      <footer className="photo-credit">photo by Chuan Zhang</footer>
    </div>
  );
}
