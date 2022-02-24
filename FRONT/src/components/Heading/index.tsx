import React from "react";

import { Wrapper } from "./styles";

export type LineColors = "gray" | "primary" | "secondary";

export type HeadingProps = {
  children: React.ReactNode;
  lineLeft?: boolean;
  lineColor?: LineColors;
  size?: "small" | "medium";
};

const Heading = ({
  children,
  lineLeft = false,
  lineColor = "gray",
  size = "medium",
}: HeadingProps) => (
  <Wrapper lineLeft={lineLeft} lineColor={lineColor} size={size}>
    {children}
  </Wrapper>
);

export default Heading;
