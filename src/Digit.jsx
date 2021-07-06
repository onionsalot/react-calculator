import React, { useState } from "react";
import Decimal from "./Decimal.jsx";

export default function Digit({ num, displayNum }) {
  function numPressed(number) {
    displayNum(number);
    console.log(number);
  }
  return (
    <>
      <button onClick={() => numPressed(num)}>{num}</button>
    </>
  );
}
