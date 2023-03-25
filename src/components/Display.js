import React from "react";

const Display = ({ value, result }) => {
  const stringVal = value.toString();
  const displayValue =
    stringVal.length > 18 ? parseFloat(stringVal).toExponential(10) : stringVal;

  return (
    <div
      className="w-100 d-flex justify-content-end p-2 rounded position-relative"
      style={{
        height: "75px",
        backgroundColor: "#333",
        borderColor: "red",
        borderWidth: "2px",
        overflow: "scroll",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <p
        className="p-0 m-1 text-right position-absolute top-0 end-0"
        style={{
          fontSize: "0.7em",
          fontFamily: "Orbitron",
          color: "orange",
        }}
      >
        {result ? result : `made with love by grivdm`}
      </p>
      <p
        id="display"
        className="p-0 m-1 text-right position-absolute bottom-0 end-0 "
        style={{
          fontSize: `${displayValue.length > 10 ? "1.2em" : "2em"}`,
          fontFamily: "Orbitron",
          color: "red",
        }}
      >
        {displayValue}
      </p>
    </div>
  );
};

export default Display;
