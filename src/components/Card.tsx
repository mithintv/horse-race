import { useState, useEffect } from "react";

import { clubs } from "../models/deck";

export const Card = (props: { display: string; suit: string }) => {
  const [color, setColor] = useState("red");
  useEffect(() => {
    if (props.suit === "spades" || props.suit === "clubs") {
      setColor("black");
    } else setColor("red");
  }, [props.suit]);

  return (
    <div
      css={{
        height: "100%",
        color: color,
        fontSize: "8rem",
      }}
    >
      {props.display}
    </div>
  );
};
