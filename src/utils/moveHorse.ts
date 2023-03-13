export const getPixels = (prevState: string) => {
  let slicePoint = prevState.indexOf("px");
  let pixelNum = prevState.slice(0, slicePoint);
  return pixelNum;
};

export const moveForward = (prevState: string) => {
  let pixelNum = getPixels(prevState);
  if (pixelNum === "600") return prevState;
  return (parseInt(pixelNum) + 100).toString() + "px";
};

export const moveBackward = (prevState: string) => {
  let pixelNum = getPixels(prevState);
  if (pixelNum === "600") return prevState;
  return (parseInt(pixelNum) - 100).toString() + "px";
};
