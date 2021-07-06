import React, { useState } from "react";
import Decimal from "./Decimal.jsx";
import Digit from "./Digit.jsx";

export default function Operation({ op, handleOperation }) {
  function opPressed(operation) {
    console.log(operation);
    handleOperation(operation);
  }
  return (
    <>
      <button className="orange" onClick={() => opPressed(op)}>
        {op}
      </button>
    </>
  );
}
