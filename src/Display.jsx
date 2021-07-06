import React from "react";

export default function Display(props) {
  return (
    <>
      <h1>{props.showNum.length ? props.showNum : "0"}</h1>
    </>
  );
}
