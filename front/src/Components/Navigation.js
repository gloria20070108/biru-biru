import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function Navigation() {
  const fetchUser = async () => {
    const res = await fetch("/getUser");

    if (res.status === 200) {
      console.log(res);
      window.location.href = "/home";
    } else {
      window.location.href = "/signin";
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <div></div>;
}

Navigation.propTypes = {};
