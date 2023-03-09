import { useState, useEffect } from "react";

import { hearts, spades, diamonds, clubs, joker } from "../models/deck";

export const Card = (props: {
  suit: typeof hearts | typeof spades | typeof diamonds | typeof joker;
  card: string;
}) => {
  const [color, setColor] = useState("red");
  useEffect(() => {
    if (props.suit === spades || props.suit === clubs) {
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
      {props.suit.get(props.card)}
    </div>
  );
};
