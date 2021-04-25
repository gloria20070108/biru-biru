import React from "react";

import { useParams } from "react-router-dom";

import TopBar from "../Components/TopBar/TopBar";
import BeerDetail from "../Components/DetailPage/BeerDetail";

export default function DetailPage() {
  const { id } = useParams();

  return (
    <div>
      <main>
        <div className="app">
          <TopBar />
          <BeerDetail id={id} />
        </div>
      </main>
      <footer className="photo-credit">photo by Chuan Zhang</footer>
    </div>
  );
}
