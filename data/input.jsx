import React from "react";
import { A, B } from "./foo";

export interface Props {
  readonly abc: number;
}

const a: number = (3 + 4);

function Component() {
  const xyz = "true"
    ? "hey"
    : "nope";

  return (
    <A>
      {xyz}
      <B />
      {a}
    </A>
  );
}
