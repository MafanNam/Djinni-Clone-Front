"use client";

import {CSSProperties} from "react";
import {RingLoader} from "react-spinners";


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Spinner() {
  return (
    <div>
      <RingLoader
        color='#800080'
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Spinner Spinner"
        data-testid="loader"
      />
    </div>
    )
}