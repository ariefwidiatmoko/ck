import React from "react";

const LoadingButton = ({ style }) => {
  return (
    <div style={style}>
      <button className="button is-loading custom-borderless"></button>
    </div>
  );
};

export default LoadingButton;
