import React from "react";
import "../index.css";
const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div className="loader__bar" />
        <div className="loader__bar" />
        <div className="loader__bar" />
        <div className="loader__bar" />
        <div className="loader__bar" />
        <div className="loader__ball" />
      </div>
    </div>
  );
};

export default Loader;