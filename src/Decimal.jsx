import React from "react";

export default function Decimal({ handleDecimal }) {
  function decPressed(decimal) {
    handleDecimal(decimal);
    console.log(decimal);
  }
  return (
    <>
      <button onClick={() => decPressed(".")}>.</button>
    </>
  );
}
