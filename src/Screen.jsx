import React from "react";

const Screen = ({ expression, currentEntry }) => {
  return (
    <div className="screen">
      <div>{expression || 0}</div>
      <div id="display">{currentEntry || 0}</div>
    </div>
  );
};

export default Screen;
