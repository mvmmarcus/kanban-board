import React from "react";

import { Wrapper } from "./styles";

type BoardTypes = {
  children?: React.ReactNode;
};

const Board = ({ children }: BoardTypes) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Board;
