import { keyframes } from "@emotion/react";

export const slide = (horse: string, direction: string) => {
  if (direction === "forward") {
    return keyframes`
    from {
      transform: translateX(${parseInt(horse) - 100}px);
    }
    to {
      transform: translateX(${horse});
    }`;
  } else {
    return keyframes`
    from {
      transform: translateX(${parseInt(horse) + 100}px);
    }
    to {
      transform: translateX(${horse});
    }`;
  }
};

export const animationCSS = (horse: string, direction: string) => {
  return {
    animation: `${slide(horse, direction)} 1s ease`,
    transform: `translateX(${horse})`,
  };
};
