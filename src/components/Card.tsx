import { useState, useEffect } from "react";

export const Card = (props: { display: string; suit: string }) => {
  const [color, setColor] = useState("red");
  useEffect(() => {
    if (props.suit === "none") setColor("black");
    else if (props.suit === "spades" || props.suit === "clubs") {
      setColor("black");
    } else setColor("red");
  }, [props.suit]);

  return (
    <div
      css={{
        color: color,
        fontSize: "8rem",
      }}
    >
      {props.display}
    </div>
  );
};
